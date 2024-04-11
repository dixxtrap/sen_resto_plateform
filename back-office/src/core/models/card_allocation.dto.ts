import { yupResolver } from "@hookform/resolvers/yup";
import { CreationDetailDto } from "./creation_details.dto";
import { User } from "./user.dto";
import* as  yup from 'yup'
import { CardDto } from "./card.dto";
export class CardAllocationDto {
    id?: number;
  
    label?: string;
  
    motif?: string;
  
    senderId?: number;
  
    quantity?: number;
  
    status?: AllocationStatusEnum;
  
    receiverId?: number;
  
    startSerial?: string;
    acceptedBy?:User
    acceptedById?:number;
    rejectionMotif?:string;
    endSerial?: string;
    card?:CardDto[];
    details?:CreationDetailDto
  }
  export enum AllocationStatusEnum {
    initiate = 'initiate',
    accepted = 'accepted',
    rejected = 'rejected',
  }

  export const CardAllocationSchema=yupResolver(yup.object({
    label:yup.string(),
    motif:yup.string(),
    receiverId: yup.number(),
    quantity:yup.number()
  }))