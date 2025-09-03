"use client"

import VideoUploadPage from '../upload/page'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Dashboard() {

    const {status} = useSession();
    const router = useRouter();

    if(status === 'unauthenticated')
        router.push('/login');

  return (
    <div className="font-sans items-center justify-items-center">
   <VideoUploadPage />
  </div>
  )
}

export default Dashboard