export const exceptionCode = {
  LOGIN_SUCCESS: {
    status: 'success',
    code: 200,
    message: 'Connexion etablie avec success',
  },
  LOGIN_FAILLURE: {
    status: 'FAILLURE',
    code: 401,
    message: 'Identifiant de connexion incorrect',
  },
  LOGOUT_SUCCESS: {
    status: 'success',
    code: 200,
    message: 'DEconnexion reussi avec success',
  },
  SUCCEEDED: {
    status: 'success',
    code: 200,
    message: 'Traitement reussi avec success',
  },
  POSITIVE_AMOUNT: {
    status: 'FAILLURE',
    code: 400,
    message: 'total amount doit etre > 0',
  },
  EXCEL_FILE_NOT_FOUND: {
    status: 'EXCEL_FILE_NOT_FOUND',
    code: 404,
    message: 'excel file is required',
  },
  FAILLURE: {
    status: 'FAILLURE',
    code: 500,
    message: "Une Erreur c'est produite vueillez réessayer",
  },
  INSUFFISANT_BALANCE: {
    status: 'faillure',
    code: 500,
    message: 'Solde insufficasant',
  },
  NOT_FOUND: {
    status: 'NOT_FOUND',
    code: 404,
    message: 'Entity not found',
  },
};
