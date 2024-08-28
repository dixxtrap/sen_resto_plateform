import { User } from "./user.dto";

export class StoryDto{
    id?:number;
    imagePath?:string;
    by?:User;
    createdAt?:string;
    updatedAt?:string;
}