import * as Yup from "yup"
export class AddressDto{
       
        streetAddress?: string;
        city?: string;
        country?: string;
        postalCode?: string;
}

export const addressSchema=Yup.object({
        streetAddress: Yup.string(),
        city: Yup.string(),
        country: Yup.string() ,
        postalCode: Yup.string(),
})