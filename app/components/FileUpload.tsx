"use client"; // This component must be a client component

import { UploadedVideo } from "@/models/Video";
import {
  upload,
  UploadResponse,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: UploadResponse) => void;
  onProgress: (progress: number) => void;
  fileType?: "image" | "video";
}
// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
      }
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if(!file || !validateFile(file)){
        return;
    }

    setUploading(true);
    setError(null);

    try{
        const authRes = await fetch("/api/auth/imagekit-auth");
        const auth = await authRes.json();

        console.log(auth);

        const res = await upload({
            // Authentication parameters
            expire: auth.authenticationParameters.expire,
            token: auth.authenticationParameters.token,
            signature: auth.authenticationParameters.signature,
            file,
            fileName: file.name, 
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,

            onProgress: (event) => {
                if(event.lengthComputable && onProgress){
                    const percent = (event.loaded / event.total) * 100;
                    onProgress(Math.round(percent))
                }
            },
        });


        onSuccess(res);
    }

    catch(error){
        console.error("Upload failed: ", error);
    }

    finally{
        setUploading(false);
    }
  }

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      {uploading && (
        <span>Loading...</span>
      )}
    </>
  );
};

export default FileUpload;
