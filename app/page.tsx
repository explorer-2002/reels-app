"use client"

// import Image from "next/image";
import VideoUploadPage from "./upload/page";
import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import VideoComponent from "./components/VideoComponent";
import Profile from "./components/Profile";
import { SessionProvider } from "next-auth/react";
import Dashboard from "./components/Dashboard";
// import { SessionProvider } from "next-auth/react";

export default function Home(){
  
  // const videos = getVideoData();
  // console.log("videos: ", videos);

  

  

  // console.log(videos);

  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  );
}
