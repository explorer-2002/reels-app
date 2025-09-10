
"use client"

import Link from "next/link";
import { IVideo } from "@/models/Video";
import { Video } from "@imagekit/next";
import { Download, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Image } from '@imagekit/next';
import { Tooltip } from "@nextui-org/react";

export default function VideoComponent({ video }: { video: IVideo }) {

  console.log("Video Component");
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(video.likes || 0);

  const updateVideo = async (updatedData: Partial<IVideo>) => {
    const updatedVideo = await fetch('/api/videos', {
      method: 'PATCH',
      body: JSON.stringify({ ...updatedData }),
      headers: { 'Content-Type': 'application/json' }
    })

    console.log(updatedVideo);
    setIsLiked(true);
  }

  const handleLike = async () => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    setIsAnimating(true);

    if (!isLiked) {
      const newLikeCount = currentLikes + 1;
      setCurrentLikes(newLikeCount);
      setIsLiked(true);

      // Update in database
      await updateVideo({
        likes: newLikeCount,
        userId: video.userId,
        _id: video._id
      });
    } else {
      // Handle unlike
      const newLikeCount = Math.max(0, currentLikes - 1);
      setCurrentLikes(newLikeCount);
      setIsLiked(false);

      // Update in database
      await updateVideo({
        likes: newLikeCount,
        userId: video.userId
      });
    }

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

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
            {video.fileType === 'image' ?
              <Image
                urlEndpoint="https://ik.imagekit.io/your_imagekit_id" // New prop
                src={video.videoUrl}
                width={300}
                height={300}
                alt="Picture of the author"
              /> :
              <Video
                urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
                src={video.videoUrl}
                controls
                width={300}
                height={300}
                autoPlay={true}
              />
            }
          </div>

      </figure>

      <style jsx>{`
        @keyframes likeAnimation {
          0% {
            transform: scale(1);
          }
          15% {
            transform: scale(1.2);
          }
          30% {
            transform: scale(0.95);
          }
          45%, 80% {
            transform: scale(1);
          }
        }

        @keyframes heartBeat {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes numberPop {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes fillColor {
          0% {
            fill: currentColor;
          }
          100% {
            fill: #3b82f6;
          }
        }

        .like-button-animate {
          animation: likeAnimation 0.6s ease-in-out;
        }

        .like-icon-liked {
          color: #3b82f6;
          animation: heartBeat 0.3s ease-in-out;
        }

        .like-count-animate {
          animation: numberPop 0.4s ease-in-out;
        }

        .like-button {
          position: relative;
          overflow: visible;
        }

        .like-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: all 0.3s ease-out;
        }

        .like-button.animating::after {
          width: 40px;
          height: 40px;
          opacity: 1;
          animation: ripple 0.6s ease-out;
        }

        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.7;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            width: 40px;
            height: 40px;
            opacity: 0;
          }
        }
      `}</style>

      {/* Fixed content section */}
      <div className="p-4 space-y-3 space-x-3">
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
            onClick={handleLike}
            // className={`flex-shrink-0 p-2 cursor-pointer hover:bg-base-200 rounded-full transition-colors duration-200 group`}
            className={`
              like-button
              flex-shrink-0 p-2 cursor-pointer hover:bg-base-200 rounded-full 
              transition-colors duration-200 group
              ${isAnimating ? 'like-button-animate animating' : ''}
            `}
            aria-label="Share video"
            style={{ color: isLiked ? 'blue' : 'inherit' }}
          >
            <div className="flex items-center gap-1">
              <ThumbsUp
                className={`
                  w-5 h-5 transition-all duration-200
                  ${isLiked
                    ? 'like-icon-liked text-blue-500 fill-current'
                    : 'text-base-content/70 group-hover:text-base-content'
                  }
                  ${isAnimating && isLiked ? 'like-icon-liked' : ''}
                `}
              />
              <span
                className={`
                  text-sm font-medium transition-colors duration-200
                  ${isLiked ? 'text-blue-500' : 'text-base-content/70'}
                  ${isAnimating ? 'like-count-animate' : ''}
                `}
              >
                {currentLikes}
              </span>
            </div>
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
        <div className="flex justify-between items-center gap-2">
          <p className="text-sm text-base-content/70 leading-relaxed line-clamp-2">
            {video.description}
          </p>

          <Tooltip
            content={video.userId}
            placement="top"
            color="foreground"
            classNames={{
              content: [
                "px-3 py-2 shadow-xl rounded-lg",
                "text-white bg-gray-800", // Set a solid, opaque background color
                "backdrop-blur-none", // Explicitly remove the default blur effect
              ],
            }}
          >
            {/* The element that triggers the tooltip */}
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold cursor-pointer">
              {video.userId?.charAt(0).toUpperCase()}
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}