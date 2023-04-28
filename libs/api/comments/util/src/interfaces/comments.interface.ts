import {Timestamp} from "@angular/fire/firestore";

export interface IComment{
    userID: string;
    text: string;
    timestamp?: Timestamp;
    commentID: string;
    postID :string;
}