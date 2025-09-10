import { connectToDatabase } from "@/lib/db";
import Comments from "@/models/Comments";
import Video from "@/models/Video";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest,{ params }: { params: { id: string } }){
    try{
        await connectToDatabase();
        console.log("Function to fetch video by id called");

        const {id} = params;
        console.log("id: ", id);
        console.log("Connected to db", id);

        const video = await Video.findOne({_id: new mongoose.Types.ObjectId(id)}) || {};
        console.log("Video fetched: ", video);

        if(!video){
            return NextResponse.json({error:"No video found"});
        }

        return NextResponse.json(video);
    }

    catch(error){
        return NextResponse.json({
            error: "Failed to fetch video",
            status: 500
        })
    }
}

export async function POST(request: NextRequest){
    try{
        await connectToDatabase();
        const {comment, viewerId, videoId} = await request.json();
        console.log("Received comment data: ", {comment, viewerId, videoId});

        if(!comment || !videoId){
            return NextResponse.json({error:"Missing required fields"}, {status: 400});
        }

        const newComment = new Comments({
            comment,
            viewerId,
            videoId,
            id: uuidv4()
        });

        await newComment.save();

        return NextResponse.json({message: "Comment added successfully", comment: newComment}, {status: 201});
    }

    catch(error){
        return NextResponse.json({
            error: "Failed to add comment",
            status: 500
        })
    }
}