import { HttpExceptionCode, WsMessage } from './http_exception_code';

export const WsCatch = (err: any): PromiseLike<never> => {
  if (err instanceof WsMessage) throw err;
  console.log(err);
  throw new WsMessage(HttpExceptionCode.FAILLURE);
};
