import { model, models, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface IReply{
    id?: string;
    reply: string;
    commentId: string;
    viewerId?: string;
}

const replySchema = new Schema<IReply>(
    {
        id: {type:String, unique:true, default: () => uuidv4() },
        reply: {type:String, required:true},
        commentId: {type:String},
        viewerId: {type: String},
    },
    {
        timestamps: true
    }   
)

const Replies = models?.Replies || model<IReply>("Replies", replySchema);

export default Replies;

