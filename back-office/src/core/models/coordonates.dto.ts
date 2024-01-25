import * as Yup  from "yup"
export class CoordonatesDto{
        latitude?:number;
        longitude?:number;
}

export const coordonatesSchema=Yup.object({
        latitude:Yup.number(),
        longitude:Yup.number(),
})