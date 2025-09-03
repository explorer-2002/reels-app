
"use client"

import Link from "next/link";
import { IVideo } from "@/models/Video";
import { Video } from "@imagekit/next";
import { Download, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { set } from "mongoose";

export default function VideoComponent({ video }: { video: IVideo }) {

  console.log("Video Component");
  const [isLiked, setIsLiked] = useState(false);

  const updateVideo = async (updatedData: Partial<IVideo>) => {
    const updatedVideo = await fetch('/api/videos', {
      method: 'PATCH',
      body: JSON.stringify({ ...updatedData }),
      headers: { 'Content-Type': 'application/json' }
    })

    console.log(updatedVideo);
    setIsLiked(true);
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: video.videoUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to custom share menu
        // setIsShareMenuOpen(true);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      //   setIsShareMenuOpen(true);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = video.videoUrl;
    link.target = '_blank';
    link.download = `${video.title || 'video'}.mp4`; // Suggests a filename, you can customize this
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300 w-fit">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            {/* <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
              autoPlay={true}
            /> */}
            <Video
              urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
              src={video.videoUrl}
              controls
              width={300}
              height={300}
              autoPlay={true}
            />
          </div>
        </Link>
      </figure>

      {/* Fixed content section */}
      <div className="p-4 space-y-3">
        {/* Title and Share button row */}
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/videos/${video._id}`}
            className="hover:opacity-80 transition-opacity flex-1 min-w-0"
          >
            <h2 className="text-lg font-semibold text-base-content leading-tight truncate">
              {video.title}
            </h2>
          </Link>

           <button
            onClick={() => updateVideo({ likes: (video.likes || 0) + 1, userId: video.userId })}
            className={`${isLiked ? "bg-gray100" : ""} flex-shrink-0 p-2 cursor-pointer hover:bg-base-200 rounded-full transition-colors duration-200 group`}
            aria-label="Share video"
          >
            <ThumbsUp className={`w-5 h-5 text-base-content/70 group-hover:text-base-content transition-colors duration-200`} />
          </button>

          <button
            onClick={handleDownload}
            className="flex-shrink-0 p-2 cursor-pointer hover:bg-base-200 rounded-full transition-colors duration-200 group"
            aria-label="Download video"
          >
            <Download className="w-5 h-5 text-base-content/70 group-hover:text-base-content transition-colors duration-200" />
          </button>

          <button
            onClick={handleNativeShare}
            className="flex-shrink-0 p-2 cursor-pointer hover:bg-base-200 rounded-full transition-colors duration-200 group"
            aria-label="Share video"
          >
            <Share2 className="w-5 h-5 text-base-content/70 group-hover:text-base-content transition-colors duration-200" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-base-content/70 leading-relaxed line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}