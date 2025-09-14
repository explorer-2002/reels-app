"use client"

import Comments from '@/app/components/Comments';
import VideoComponent from '@/app/components/VideoComponent';
import VideoLoadingSpinner from '@/app/components/VideoLoadingSpinner';
import { CommentType } from '@/app/types';
import { apiClient } from '@/lib/api-client';
import { IComment } from '@/models/Comments';
import { IReply } from '@/models/Replies';
import { IVideo } from '@/models/Video';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdOutlineInsertComment } from "react-icons/md";

function page() {
    const [video, setVideo] = useState<IVideo | null>(null);
    const params = useParams();
    const id = params?.id as string;
    console.log("ID: ", id);
    console.log("Video: ", video);
    const router = useRouter();

    const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
    const [videoComments, setVideoComments] = useState<CommentType[]>([]);

    useEffect(() => {

        if (!id) return;

        const fetchVideo = async () => {
            try {
                const videoData = await apiClient.getVideoById(id) as IVideo;
                setVideo(videoData);
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
            }
        };

        fetchVideo();
    }, [id]);

    useEffect(() => {
        // Fetch comments for the video
        const fetchComments = async () => {
            if (!video || !video._id) return;
            try {
                const response = await fetch(`/api/comments/${video._id}`);
                const data = await response.json();
                setVideoComments(data);
                console.log("Fetched comments: ", data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [video]);

    if (!video) {
        return <VideoLoadingSpinner />
    }

    return (
        <div className='p-4 min-h-screen min-w-full flex flex-col items-center justify-center'>
            <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group my-auto mr-24 cursor-pointer"
                aria-label="Go back to previous page"
            >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
            </button>

            <div className='flex flex-row justify-center mb-14 items-center gap-3 transition-transform duration-500 ease-in-out'>
                {video ? (
                    <VideoComponent video={video} />
                ) : (
                    <p>Loading...</p>
                )}

                <div className='flex flex-col justify-center items-center'>
                    <button onClick={() => setCommentsOpen(true)} className='cursor-pointer'>
                        <MdOutlineInsertComment size={30} />
                        <span className='text-sm mt-1'>{videoComments?.length || 0}</span>
                    </button>
                </div>

                <div className='px-4 h-full'>
                    {commentsOpen && <Comments onClose={() => setCommentsOpen(false)} video={video!} videoComments={videoComments} setVideoComments={setVideoComments} />}
                </div>
            </div>
        </div>
    )
}

export default page