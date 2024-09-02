import { CompanyDto } from "./company.dto";

export class StoryGroup{
    id?:number;
    partnerId?:number;
    partner?:CompanyDto;
    story?:Story[]
}

export class Story{
    id?:number;
    imagePath?:string;
}