import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { WsMessage } from "../models/error.dto";
import { TextConstant } from "../data/textConstant";
import { AxiosError } from "axios";

export const  getWsMessage=(error: unknown):string=>{
const ws=error as WsMessage;
return ws? ws.message ??TextConstant.internalServerError : TextConstant.internalServerError;
}
export const errorTrasform = (response: FetchBaseQueryError| AxiosError) => {
       
        let data :Record<string,undefined>
        let status :string;
        if(response instanceof AxiosError)
       { 
        console.log("---------------------------transform response -----------------------\n", response.response);
        status=response?.response!.status!.toString();
          data=(response?.response!.data as Record<string,undefined>);}
        else{
                console.log("---------------------------transform response -----------------------\n", response);
                status=response.status?.toString();
                 data=(response?.data as Record<string,undefined>);
        }
        const errorModel: WsMessage = {
                code:data.code?? status,
                status:data.status,
                sessionExpired:data.sessionExpired,
                message: data.message || 'An error occurred',
        };
        console.log("---------------------------error response -----------------------", errorModel);

        return errorModel;
}