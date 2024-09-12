export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpResquest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface IController {
  handle(httpRequest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  CREATED = 201,
  SERVER_ERROR = 500,
  DELETED = 204,
}
