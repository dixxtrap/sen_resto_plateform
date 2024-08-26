export class BannerDto{
    id?:number;
    imageUrl?:string;
    audioUrl?:string;
    type?:'web'|"mobile";
    description?:string;
    end?:string;
    start?:string;
    isActive?:string;
    title?: string;
}