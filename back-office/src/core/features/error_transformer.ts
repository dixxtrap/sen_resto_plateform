import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { WsMessage } from "../models/error.dto";


export const errorTrasform = (response: FetchBaseQueryError) => {
        console.log("---------------------------transform response -----------------------\n", response.data);
        const errorModel: WsMessage = {
                code: response.status + "" || "500",
                message: (response.data as Record<string, undefined>)!["message"] || 'An error occurred',
        };
        console.log("---------------------------error response -----------------------", errorModel);

        return errorModel;
}