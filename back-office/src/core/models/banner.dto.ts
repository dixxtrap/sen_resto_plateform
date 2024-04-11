import { yupResolver } from "@hookform/resolvers/yup";
import { CreationDetailDto } from "./creation_details.dto";
import * as yup from 'yup';
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

  export const BannerSchema=yupResolver(yup.object({
    title:yup.string(),
    description:yup.string(),
    end:yup.date(),
    start:yup.date(),
    type:yup.string(),
  }))