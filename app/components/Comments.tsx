

import { IComment } from '@/models/Comments';
import { IVideo } from '@/models/Video';
import { X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Comments({ onClose, video }: { onClose: () => void, video: IVideo }) {
    const { data: session } = useSession();
    const [commentText, setCommentText] = useState<string>("");
    const [videoComments, setVideoComments] = useState<IComment[]>([]);

    const addComment = async (comment: string, videoId?: string, viewerId?: string) => {
        const result = await fetch(`/api/videos/${videoId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment, viewerId, videoId })
        });

        const data = await result.json();

        if (result.ok) {
            setCommentText("");

            setVideoComments((prevComments) => [...prevComments, { comment, viewerId, id: uuidv4() } as IComment]);
        }

        console.log("Comment added: ", data);
    };

    useEffect(() => {
        // Fetch comments for the video
        const fetchComments = async () => {
            if (!video || !video._id) return;
            try {
                const response = await fetch(`/api/comments/${video._id}`);
                const data = await response.json();
                setVideoComments(data);
                console.log("Fetched comments: ", data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [video]);

    return (
        <div className="flex flex-col h-full border-gray-900 flex-1 px-4 w-[50vw]">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-gray-400">Comments</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-400 transition-colors duration-200 text-gray-700">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                {/* Placeholder for comments */}
                <div className="text-gray-400">
                    {
                        videoComments.length === 0 ? (
                            <p>No comments yet. Be the first to comment!</p>
                        ) : (
                            videoComments.map((comment) => (
                                <div key={comment.id} className="mb-4 flex items-start gap-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold cursor-pointer">
                                        {comment.viewerId?.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="text-sm">{comment.comment}</p>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>

            <div className="p-4 border-gray-700">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg text-gray-200 font-bold">
                        {session?.user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 w-full border-b border-gray-600 focus:outline-none focus:border-blue-500 duration-200"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200" onClick={() => addComment(commentText, String(video?._id), session?.user?.email!)}>
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Comments;