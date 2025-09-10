import { IVideo } from "@/models/Video";
import { NextResponse } from "next/server";

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    body?: IVideo
    headers?: Record<string, string>
}

export type VideoFormData = Omit<IVideo, "_id">;

class ApiClient{
    private async fetch<T>(
        endpoint:string,
        options: FetchOptions = {}
    ) : Promise<T>{
        const {method = "GET", body, headers = {}} = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })

        return await response.json();
    }

    async getVideos(){
        return this.fetch("/videos")
    }

    async getVideoById(id: string){
        return this.fetch(`/videos/${id}`)
    }
    
    async createVideo(videoData: VideoFormData){
        return this.fetch("/videos", {
            method: "POST",
            body: videoData
        })
    }

}

export const apiClient = new ApiClient();