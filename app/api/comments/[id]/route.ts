import { connectToDatabase } from "@/lib/db";
import Comments from "@/models/Comments";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import Replies from "@/models/Replies";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }){
    try{
        await connectToDatabase();
        console.log("Function to fetch video by id called");

        const {id} = await params;
        console.log("id: ", id);
        console.log("Connected to db", id);

        // const comments = await Comments.find({videoId: id}) || {};

        // return NextResponse.json(comments);
        const commentsWithReplies = await Comments.aggregate([
            {
                $match: { videoId: id }
            },
            {
                $lookup: {
                    from: "replies", // Collection name for Replies model
                    localField: "id", // Field in comments collection
                    foreignField: "commentId", // Field in replies collection
                    as: "replies"
                }
            },
            {
                $sort: { createdAt: -1 } // Optional: Sort comments by creation date (newest first)
            }
        ]);

        return NextResponse.json(commentsWithReplies);
    }

    catch(error){
        return NextResponse.json({
            error: "Failed to fetch comments",
            status: 500
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        console.log("Function to add reply called");

        const { reply, commentId } = await request.json();
        console.log("Request body:", { reply, commentId });

        if (!reply || !commentId) {
            return NextResponse.json({ error: "Missing required fields", status: 400 });
        }

        const existingComment = await Comments.findOne({id: commentId});

        if(!existingComment){
            return NextResponse.json({ error: "Comment not found", status: 404 });
        }

        const newReply = new Replies({
            reply,
            commentId,
        });

        await newReply.save();
        console.log("New reply added:", newReply);

        return NextResponse.json(newReply, { status: 201 });
    } catch (error) {
        console.error("Error adding comment:", error);
        return NextResponse.json({ error: "Failed to add comment", status: 500 });
    }

}
