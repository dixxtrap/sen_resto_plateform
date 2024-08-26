import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { WsMessage } from "../models/error.dto";
import { TextConstant } from "../constant/textConstant";


export const  getWsMessage=(error: unknown):string=>{
const ws=error as WsMessage;
return ws? ws.message ??TextConstant.internalServerError : TextConstant.internalServerError;
}
export const errorTrasform = (response: FetchBaseQueryError) => {
  console.log(
    "---------------------------transform response -----------------------\n",
    response
  );
  const status = response.status?.toString();
  const data = response?.data as Record<string, undefined>;

  const errorModel: WsMessage = {
    code: data.code ?? status,
    status: data.status,
    sessionExpired: data.sessionExpired,
    message: data.message || "An error occurred",
  };
  console.log(
    "---------------------------error response -----------------------",
    errorModel
  );

  return errorModel;
}