import { IComment } from "@/models/Comments";
import { IReply } from "@/models/Replies";

export interface CommentType extends IComment{
        replies?: IReply[]
}