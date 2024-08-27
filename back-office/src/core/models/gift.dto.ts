import { CreationDetailDto } from "./creation_details.dto";

export class GiftDto{
    id?: number;
    description?: string;
    isActive?: boolean;
    discount?: number;
    details?: CreationDetailDto;
    history?:GiftDto[]
}