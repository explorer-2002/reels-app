// import { authOptions } from "@/lib/auth";
// import { connectToDatabase } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        await connectToDatabase();
        console.log("Connected to db");

        const videos = await Video.find({}).sort({createdAt:-1}).lean() || [];

        if(!videos || videos?.length === 0){
            return NextResponse.json({error:"No video found"});
        }

        return NextResponse.json(videos);
    }

    catch(error){
        return NextResponse.json({
            error: "Failed to fetch videos",
            status: 500
        })
    }
}

export async function POST(request: NextRequest){
    try{
        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json({
                error: "Unauthorized",
                status:401
            })
        }

        console.log("Reached here");

        await connectToDatabase();

        const body: IVideo = await request.json();

        console.log(body);

        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl){
            return NextResponse.json({
                error: "Bad Request",
                status: 400
            })
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body?.transformation?.quality ?? 100
            }
        }

        const response = await Video.create(videoData);
        return NextResponse.json(response);
        console.log("Saved to the db");
    }

    catch(error){
        return NextResponse.json({error: "Failed to create video"}, {status: 401})
    }
}

export async function PATCH(request: NextRequest){
     
     try{
        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json({
                error: "Unauthorized",
                status:401
            })
        }

        await connectToDatabase();

        const body: IVideo = await request.json();

        const videoData: IVideo = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body?.transformation?.quality ?? 100
            }
        }

        const response = await Video.findOneAndUpdate({userId: videoData?.userId, _id: videoData?._id}, videoData, {new: true, upsert: true});
        return NextResponse.json(response);
    }

    catch(error){
        return NextResponse.json({error: "Failed to update video"}, {status: 401})
    }
}