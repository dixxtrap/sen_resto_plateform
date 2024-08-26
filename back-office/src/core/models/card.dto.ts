import { CreationDetailDto } from "./creation_details.dto";
export enum CardStatusEnum {
        pending = 'In Progress',
        Assigned = 'Assigned',
        readyForAllocation = 'Ready for Allocation',
        blocked = 'Blocked',
        delected = 'Delected',
        cancelled = 'Cancelled',
      }
export class CardDto{
        id?:number;
        serial?:string;
       pan? :string;
       uid?:string;
       status?:CardStatusEnum
       details?:CreationDetailDto
}