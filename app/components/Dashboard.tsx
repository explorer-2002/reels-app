"use client"

import React, { useEffect, useState } from 'react'
import Profile from './Profile'
import VideoUploadPage from '../upload/page'
import VideoComponent from './VideoComponent';
import { apiClient } from '@/lib/api-client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


function Dashboard() {

    const [videos, setVideos] = useState<any>([]);
    const {status} = useSession();
    const router = useRouter();

    if(status === 'unauthenticated')
        router.push('/login');
    
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

  return (
    <div className="font-sans items-center justify-items-center">
    <Profile />
   <VideoUploadPage />
   {videos.length>0 && videos?.map((video:any) => {
    return <VideoComponent video={video} key={video._id} />
   })
  }
  </div>
  )
}

export default Dashboard