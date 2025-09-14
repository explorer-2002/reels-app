"use client"

import { apiClient } from '@/lib/api-client';
import React, { useEffect, useState } from 'react'
import VideoComponent from '../components/VideoComponent';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IVideo } from '@/models/Video';
import Link from 'next/link';

function page() {
    const [videos, setVideos] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoData = await apiClient.getVideos();
                setVideos(videoData);
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
            }
        };

        fetchVideos();
    }, []);

    const seenIds = new Set();
    const uniqueVideos = videos?.filter((video: any) => {
        if (video?.fileType === 'image' || seenIds.has(video.title)) {
            return false;
        }
        seenIds.add(video.title);
        return true;
    });

    return (
        <>
            <div className="flex items-center gap-4 mb-6 p-3">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                    aria-label="Go back to previous page"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
                </button>

                <h1 className="text-3xl font-bold tracking-tight">
                    Videos
                </h1>
            </div>

            <div className='flex items-center justify-center'>
                {uniqueVideos?.length > 0 && uniqueVideos?.map((video: any) => {
                    return <Link href={`/videos/${video._id}`} key={video._id}>
                        <VideoComponent video={video} key={video._id} />
                    </Link>
                })
                }
            </div>
        </>
    )
}

export default page