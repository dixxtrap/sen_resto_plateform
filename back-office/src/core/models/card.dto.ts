import { CreationDetailDto } from "./creation_details.dto";

export class CardDto{
        id?:number;
        serial?:number;
       number? :number;
       uid?:string;
       details?:CreationDetailDto
}