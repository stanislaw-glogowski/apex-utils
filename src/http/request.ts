import { IIncomingEvent, getParamValue } from "./event";

export interface IRequest {
  method: string;
  body: string | null;
  header(key: string, defaultValue?: string): string;
  param(key: string, defaultValue?: any): any;
  query(key: string, defaultValue?: any): any;
}

export class Request implements IRequest {
  constructor(private event: IIncomingEvent) {
    //
  }

  public get method(): string {
    return this.event.httpMethod;
  }

  public get body(): string {
    return this.event.body || null;
  }

  public header(key: string, defaultValue?: string): string {
    return getParamValue(this.event.headers, key, defaultValue || "");
  }

  public param(key: string, defaultValue?: any): any {
    return getParamValue(this.event.pathParameters, key, defaultValue);
  }

  public query(key: string, defaultValue?: any): any {
    return getParamValue(this.event.queryStringParameters, key, defaultValue);
  }
}
