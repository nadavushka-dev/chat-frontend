type ApiOkReponse<T> = {
  isOk: true;
  data: T;
};

type ApiErrorReponse = {
  isOk: false;
  error: Error;
};

type ApiResponse<T> = ApiOkReponse<T> | ApiErrorReponse;
