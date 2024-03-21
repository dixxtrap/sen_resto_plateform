import { CreationDetailDto } from "./creation_details.dto";

export class CardDto{
        id?:number;
        serial?:string;
       number? :string;
       uid?:string;
       details?:CreationDetailDto
}