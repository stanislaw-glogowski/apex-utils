export interface IResponseData {
  statusCode?: number;
  headers?: { [key: string]: string | boolean };
  body?: any;
}
