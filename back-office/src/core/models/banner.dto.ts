
import { CreationDetailDto } from "./creation_details.dto";

export class BannerDto{
    id?:number;
    title?:string;
    audioUrl?: string;
    imageUrl?: string;
    type?: BannerType;
    description?: string;
    start?: string;
    end?: string;
    details?: CreationDetailDto;
    isActive?: boolean;
}
export enum BannerType {
    WEB = 'web',
    MOBILE = 'mobile',
  }
