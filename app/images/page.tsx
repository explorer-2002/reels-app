"use client"

import { apiClient } from '@/lib/api-client';
import React, { useEffect, useState } from 'react'
import VideoComponent from '../components/VideoComponent';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IVideo } from '@/models/Video';

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
    const uniqueVideos = videos?.length > 0 ? videos?.filter((video: any) => {
        if (video?.fileType === 'video' || seenIds.has(video.title)) {
            return false;
        }
        seenIds.add(video.title);
        return true;
    }) : [];

      if (!uniqueVideos || uniqueVideos?.length === 0) {
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
                            Images
                        </h1>
                    </div>
    
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                        <div className="text-6xl mb-6">🖼️</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                            No Images Found
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 max-w-md">
                            It looks like there are no images available right now. Check back later or try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                            Refresh Page
                        </button>
                    </div>
                </>
            );
        }

    return (
        <>
            <div className="flex items-center gap-3 mb-6 p-3">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                    aria-label="Go back to previous page"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
                </button>

                <h1 className="text-3xl font-bold tracking-tight">
                    Images
                </h1>
            </div>

            <div className='flex items-center justify-center'>
                {uniqueVideos.length > 0 && uniqueVideos?.map((video: any) => {
                    return <VideoComponent video={video} key={video._id} />
                })
                }
            </div>
        </>
    )
}

export default page