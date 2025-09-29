// "use client"; // This component must be a client component

// import { UploadedVideo } from "@/models/Video";
// import {
//   upload,
//   UploadResponse,
// } from "@imagekit/next";
// import { useRef, useState } from "react";

// interface FileUploadProps {
//   onSuccess: (res: UploadResponse) => void;
//   onProgress: (progress: number) => void;
//   fileType?: "image" | "video";
// }
// // UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
// const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const validateFile = (file: File) => {
//     if (fileType === "video") {
//       if (!file.type.startsWith("video/")) {
//         setError("Please upload a valid video file");
//       }
//     }

//     if (file.size > 100 * 1024 * 1024) {
//       setError("File size must be less than 100 MB");
//     }

//     return true;
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if(!file || !validateFile(file)){
//         return;
//     }

//     setUploading(true);
//     setError(null);

//     try{
//         const authRes = await fetch("/api/auth/imagekit-auth");
//         const auth = await authRes.json();

//         console.log(auth);

//         const res = await upload({
//             // Authentication parameters
//             expire: auth.authenticationParameters.expire,
//             token: auth.authenticationParameters.token,
//             signature: auth.authenticationParameters.signature,
//             file,
//             fileName: file.name, 
//             publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,

//             onProgress: (event) => {
//                 if(event.lengthComputable && onProgress){
//                     const percent = (event.loaded / event.total) * 100;
//                     onProgress(Math.round(percent))
//                 }
//             },
//         });


//         onSuccess(res);
//     }

//     catch(error){
//         console.error("Upload failed: ", error);
//     }

//     finally{
//         setUploading(false);
//     }
//   }

//   return (
//     <>
//       <input
//         type="file"
//         accept={fileType === "video" ? "video/*" : "image/*"}
//         onChange={handleFileChange}
//       />
//       {uploading && (
//         <span>Loading...</span>
//       )}
//     </>
//   );
// };

// export default FileUpload;

// "use client";

// import { UploadedVideo } from "@/models/Video";
// import { upload, UploadResponse } from "@imagekit/next";
// import { useRef, useState } from "react";

// interface FileUploadProps {
//   onSuccess: (res: UploadResponse) => void;
//   onProgress: (progress: number) => void;
//   fileType?: "image" | "video";
// }

// const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [dragOver, setDragOver] = useState(false);

//   const validateFile = (file: File) => {
//     setError(null);
    
//     if (fileType === "video") {
//       if (!file.type.startsWith("video/")) {
//         setError("Please upload a valid video file");
//         return false;
//       }
//     }

//     if (file.size > 100 * 1024 * 1024) {
//       setError("File size must be less than 100 MB");
//       return false;
//     }

//     return true;
//   };

//   const handleFileUpload = async (file: File) => {
//     if (!file || !validateFile(file)) {
//       return;
//     }

//     setUploading(true);
//     setError(null);

//     try {
//       const authRes = await fetch("/api/auth/imagekit-auth");
//       const auth = await authRes.json();

//       const res = await upload({
//         expire: auth.authenticationParameters.expire,
//         token: auth.authenticationParameters.token,
//         signature: auth.authenticationParameters.signature,
//         file,
//         fileName: file.name,
//         publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
//         onProgress: (event) => {
//           if (event.lengthComputable && onProgress) {
//             const percent = (event.loaded / event.total) * 100;
//             onProgress(Math.round(percent));
//           }
//         },
//       });

//       onSuccess(res);
//     } catch (error) {
//       console.error("Upload failed: ", error);
//       setError("Upload failed. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       await handleFileUpload(file);
//     }
//   };

//   const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setDragOver(false);
    
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       await handleFileUpload(file);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setDragOver(false);
//   };

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="w-full">
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept={fileType === "video" ? "video/*" : "image/*"}
//         onChange={handleFileChange}
//         className="hidden"
//       />
      
//       <div
//         onClick={handleClick}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         className={`
//           relative cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
//           ${dragOver 
//             ? 'border-blue-500 bg-blue-50 scale-105' 
//             : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
//           }
//           ${uploading ? 'pointer-events-none opacity-50' : ''}
//         `}
//       >
//         <div className="flex flex-col items-center space-y-4">
//           {/* Upload Icon */}
//           <div className={`
//             w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300
//             ${dragOver ? 'bg-blue-100' : 'bg-gray-100'}
//           `}>
//             <svg 
//               className={`w-8 h-8 ${dragOver ? 'text-blue-600' : 'text-gray-500'}`} 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
//               />
//             </svg>
//           </div>

//           {/* Upload Text */}
//           <div className="space-y-2">
//             <h3 className="text-lg font-semibold text-gray-900">
//               {uploading ? 'Uploading...' : 'Choose File or Drag & Drop'}
//             </h3>
//             <p className="text-sm text-gray-600">
//               {fileType === "video" 
//                 ? "Upload your video file (Max 100MB)" 
//                 : "Upload your image file (Max 100MB)"
//               }
//             </p>
//             <p className="text-xs text-gray-500">
//               Supported formats: {fileType === "video" ? "MP4, MOV, AVI, WebM" : "JPG, PNG, GIF, WebP"}
//             </p>
//           </div>

//           {/* Browse Button */}
//           {!uploading && (
//             <button 
//               type="button"
//               className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
//             >
//               Browse Files
//             </button>
//           )}

//           {/* Loading Spinner */}
//           {uploading && (
//             <div className="flex items-center space-x-2">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//               <span className="text-sm text-gray-600">Processing...</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

"use client";

import { UploadedVideo } from "@/models/Video";
import { upload, UploadResponse } from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: UploadResponse) => void;
  onProgress: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const validateFile = (file: File) => {
    setError(null);
    
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file: File) => {
    if (!file || !validateFile(file)) {
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const res = await upload({
        expire: auth.authenticationParameters.expire,
        token: auth.authenticationParameters.token,
        signature: auth.authenticationParameters.signature,
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });

      onSuccess(res);
    } catch (error) {
      console.error("Upload failed: ", error);
      setError("Upload failed. Please try again.");
      onProgress(0)
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${dragOver 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Upload Icon */}
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300
            ${dragOver ? 'bg-blue-100' : 'bg-gray-100'}
          `}>
            <svg 
              className={`w-8 h-8 ${dragOver ? 'text-blue-600' : 'text-gray-500'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
          </div>

          {/* Upload Text */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {uploading ? 'Uploading...' : 'Choose File or Drag & Drop'}
            </h3>
            <p className="text-sm text-gray-600">
              {fileType === "video" 
                ? "Upload your video file (Max 100MB)" 
                : "Upload your image file (Max 10MB)"
              }
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: {fileType === "video" 
                ? "MP4" 
                : "JPG, JPEG, PNG"
              }
            </p>
          </div>

          {/* Browse Button */}
          {!uploading && (
            <button 
              type="button"
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Browse Files
            </button>
          )}

          {/* Loading Spinner */}
          {uploading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Processing...</span>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
