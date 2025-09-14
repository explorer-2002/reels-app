// import React from "react";
// import FileUpload from "./FileUpload";

// function VideoUploadForm() {

//   return (
//     <div>
//      <FileUpload />
//     </div>
//   );
// }

// export default VideoUploadForm;

"use client";

import { useRef, useState } from "react";
import FileUpload from "./FileUpload"; // Adjust the import path as needed
import { UploadedVideo } from "@/models/Video";
import { UploadResponse } from "@imagekit/next";
import { apiClient } from "@/lib/api-client";
import { useSession } from "next-auth/react";
import { set } from "mongoose";

const VideoUploadPage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState<UploadResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const {data:session} = useSession();
  const userId = session?.user?.email;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState<'image' | 'video'>('video');

  const handleUploadSuccess = (response: UploadResponse) => {
    console.log("Upload successful:", response);
    setUploadedVideo(response);
    setIsUploading(false);
    setUploadProgress(0);

    // You can access various properties from the response:
    // - response.url: Direct URL to the uploaded video
    // - response.fileId: Unique file ID
    // - response.name: File name
    // - response.size: File size in bytes
    // - response.filePath: File path in ImageKit
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
    if (progress > 0) {
      setIsUploading(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!uploadedVideo) {
      return;
    }

    // Process the form data with title, description, and uploadedVideo
    console.log({
      title,
      description,
      uploadedVideo
    });

    await apiClient.createVideo({title, description, videoUrl:uploadedVideo.url!,fileType: fileType, thumbnailUrl: "thumbnail url", userId:userId!})
    setTitle("");
    setDescription("");
    setUploadedVideo(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="">
        <div className="">
          <form onSubmit={handleSubmit} className="flex flex-col justify-content-center align-middle gap-y-2">
            <label>Title</label>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-50"/>

            <label>Description</label>
            <textarea rows={6} cols={15} onChange={(e) => setDescription(e.target.value)} className="bg-gray-50" />


            <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm font-medium">File Type:</span>
            <div className="flex items-center">
              <input
                type="radio"
                id="fileTypeImage"
                name="fileType"
                value="image"
                checked={fileType === 'image'}
                onChange={() => {
                  console.log('image selected');
                  setFileType('image')
                }}
                className={`focus:ring-blue-500 h-4 w-4 border-gray-300`}
              />
              <label htmlFor="fileTypeImage" className="ml-2 block text-sm">Image</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="fileTypeVideo"
                name="fileType"
                value="video"
                checked={fileType === 'video'}
                onChange={() => {
                  console.log('video selected');
                  setFileType('video')
                }}
                className={`focus:ring-blue-500 h-4 w-4 border-gray-300`}
              />
              <label htmlFor="fileTypeVideo" className="ml-2 block text-sm">Video</label>
            </div>
          </div>

            <FileUpload
              fileType={fileType}
              onSuccess={handleUploadSuccess}
              onProgress={handleUploadProgress}
            />

            <button type="submit" className="w-full bg-blue-500 text-gray-50">Upload Video / Image</button>
          </form>
        </div>

        {isUploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        {uploadedVideo && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Upload Successful!
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>File Name:</strong> {uploadedVideo.name}
              </p>
              <p>
                <strong>File ID:</strong> {uploadedVideo.fileId}
              </p>
              <p>
                <strong>Size:</strong>{" "}
                {uploadedVideo?.size ?? Math.round(uploadedVideo?.size! / 1024 / 1024)} MB
              </p>
              <p>
                <strong>URL:</strong>
                <a
                  href={uploadedVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  View Video
                </a>
              </p>
            </div>

            {/* Optional: Display the uploaded video */}
            {/* <div className="mt-3">
              <video
                controls
                className="w-full max-w-sm rounded"
                src={uploadedVideo.url}
              >
                Your browser does not support the video tag.
              </video>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploadPage;
