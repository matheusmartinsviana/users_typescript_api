export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpResquest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface IController {
  handle(httpRequest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}
