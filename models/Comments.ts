import { model, models, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface IComment{
    id?: string;
    comment: string;
    viewerId?: string;
    videoId?: string;
}

const commentSchema = new Schema<IComment>(
    {
        id: {type:String, unique:true, default: uuidv4() },
        comment: {type:String, required:true},
        viewerId: {type:String},
        videoId: {type:String}
    },
    {
        timestamps: true
    }   
)

const Comments = models?.Comments || model<IComment>("Comments", commentSchema);

export default Comments;