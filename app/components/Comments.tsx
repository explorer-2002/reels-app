

import { IComment } from '@/models/Comments';
import { IVideo } from '@/models/Video';
import { X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CommentType } from '../types';
import { IReply } from '@/models/Replies';

function Comments({ onClose, video, videoComments, setVideoComments }: { onClose: () => void, video: IVideo, videoComments: CommentType[], setVideoComments: React.Dispatch<React.SetStateAction<CommentType[]>> }) {
    const { data: session } = useSession();
    const [commentText, setCommentText] = useState<string>("");
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
    const [replyText, setReplyText] = useState<string>("");
    const [showRepliesForComment, setShowRepliesForComment] = useState<Set<string>>(new Set());

    console.log("Video comments: ", videoComments);

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

            setVideoComments((prevComments) => [...prevComments, { comment, viewerId, id: uuidv4() } as CommentType]);
        }

        console.log("Comment added: ", data);
    };

     const addReply = async (reply: string, commentId: string, videoId?: string, viewerId?: string) => {
        // You can implement the API call for replies here
        // For now, just updating the UI
        console.log("Reply added to comment:", commentId, reply);
        
        // Close the reply form
        setActiveReplyId(null);
        setReplyText("");
        
         const result = await fetch(`/api/comments/${videoId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reply: replyText, viewerId, commentId })
        });

        const data = await result.json();

        // if (result.ok) {
        //     setCommentText("");

        //     setVideoComments((prevComments) => [...prevComments, { comment, viewerId, id: uuidv4() } as IComment]);
        // }

        console.log("Comment added: ", data);
        // You might want to update the comments state with replies
        // This depends on how you structure your reply data
    };

    const toggleReply = (commentId: string) => {
        if (activeReplyId === commentId) {
            setActiveReplyId(null);
            setReplyText("");
        } else {
            setActiveReplyId(commentId);
            setReplyText("");
        }
    };

     const toggleShowReplies = (commentId: string) => {
        setShowRepliesForComment(prev => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    };

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
                                    <div className='flex-1 w-full'>
                                    <p className="text-sm">{comment.comment}</p>

                                    <div className="flex flex-1 justify-end mt-2 w-full">
                                                <button 
                                                    onClick={() => toggleReply(comment.id!)}
                                                    className="text-xs text-blue-400 hover:text-blue-300 w-1/3 transition-colors duration-200 pr-0 py-1 rounded hover:bg-gray-800"
                                                >
                                                    {activeReplyId === comment.id ? 'Cancel' : 'Reply'}
                                                </button>
                                        
                                                 {comment.replies && comment.replies.length > 0 && (
                                                    <button 
                                                        onClick={() => toggleShowReplies(comment.id!)}
                                                        className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-800"
                                                    >
                                                        {showRepliesForComment.has(comment.id!) 
                                                            ? `Hide ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}` 
                                                            : `Show ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`
                                                        }
                                                    </button>
                                                )}
                                            {/* Reply Form */}
                                            {activeReplyId === comment.id && (
                                                <div className="mt-3 ml-1 border-l border-gray-600 pl-3 w-2/3">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm text-gray-200 font-bold">
                                                            {session?.user?.email?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Add a reply..."
                                                            className="flex-1 w-full bg-transparent border-b border-gray-600 focus:outline-none focus:border-blue-500 transition-colors duration-200 text-sm py-2"
                                                            value={replyText}
                                                            onChange={(e) => setReplyText(e.target.value)}
                                                            autoFocus
                                                        />
                                                    </div>
                                                    <div className="flex justify-end mt-3 space-x-2">
                                                        <button 
                                                            onClick={() => toggleReply(comment.id!)}
                                                            className="px-3 py-1 text-sm hover:text-gray-200 transition-colors duration-200"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button 
                                                            onClick={() => addReply(replyText, comment.id!, String(video?._id), session?.user?.email!)}
                                                            disabled={!replyText.trim()}
                                                            className="px-3 py-1 bg-blue-600 text-sm rounded hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            Reply
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                             {comment.replies && comment.replies.length > 0 && showRepliesForComment.has(comment.id!) && (
                                        <div className="ml-8 mt-3 space-y-3">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="flex items-start gap-2 border-l border-gray-600 pl-3">
                                                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-semibold cursor-pointer">
                                                        {reply.viewerId?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm text-gray-300">{reply.reply}</p>
                                                        <p className="text-xs text-gray-500 mt-1">@{reply.viewerId}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                            
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>

            <div className="p-4 border-gray-700">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
                        {session?.user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 w-full border-b border-gray-600 focus:outline-none focus:border-blue-500 duration-200"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-blue-600 rounded-full text-gray-300 hover:bg-blue-700 transition-colors duration-200" onClick={() => addComment(commentText, String(video?._id), session?.user?.email!)}>
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Comments;