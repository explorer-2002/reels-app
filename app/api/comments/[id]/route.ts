import { connectToDatabase } from "@/lib/db";
import Comments from "@/models/Comments";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }){
    try{
        await connectToDatabase();
        console.log("Function to fetch video by id called");

        const {id} = params;
        console.log("id: ", id);
        console.log("Connected to db", id);

        const comments = await Comments.find({videoId: id}) || {};

        return NextResponse.json(comments);
    }

    catch(error){
        return NextResponse.json({
            error: "Failed to fetch comments",
            status: 500
        })
    }
}

