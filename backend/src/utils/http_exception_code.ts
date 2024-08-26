import { HttpException } from '@nestjs/common';
export class WsMessage extends HttpException {
  private code: string;
  constructor({
    message,
    status,
    code,
  }: {
    message: string;
    status: number;
    code: string;
  }) {
    super(
      {
        message,
        code,
        sessionExpired: status === 401 ? true : false,
        status: status === 200 ? true : false,
      },
      status,
    );
    this.name = 'CustomError';
    this.code = code;
    Object.setPrototypeOf(this, WsMessage.prototype);
  }
}
export const HttpExceptionCode = {
  LOGIN_SUCCESS: {
    code: 'SUCCEEDED',
    status: 200,
    message: 'Connexion etablie avec success',
  },
  LOGIN_FAILLURE: {
    code: 'FAILLURE',
    status: 401,
    message: 'Identifiant de connexion incorrect',
  },
  LOGOUT_SUCCESS: {
    code: 'SUCCEEDED',
    status: 200,
    message: 'DEconnexion reussi avec success',
  },
  SUCCEEDED: {
    code: 'SUCCEEDED',
    status: 200,
    message: 'Traitement reussi avec success',
  },
  POSITIVE_AMOUNT: {
    code: 'FAILLURE',
    status: 400,
    message: 'total amount doit etre > 0',
  },
  EXCEL_FILE_NOT_FOUND: {
    code: 'EXCEL_FILE_NOT_FOUND',
    status: 404,
    message: 'excel file is required',
  },
  FAILLURE: {
    code: 'FAILLURE',
    status: 500,
    message: "Une Erreur c'est produite vueillez réessayer",
  },
  INSUFFISANT_BALANCE: {
    code: 'faillure',
    status: 500,
    message: 'Solde insufficasant',
  },
  INSUFFISANT_QUANTITY: {
    code: 'faillure',
    status: 400,
    message: 'Insuffisant quantity',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    status: 404,
    message: 'Entity not found',
  },
};
