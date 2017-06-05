import { IIncomingEvent, getParamValue } from "./event";

export interface IRequest {
  method: string;
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

  public param(key: string, defaultValue?: any): any {
    return getParamValue(this.event.pathParameters, key, defaultValue);
  }

  public query(key: string, defaultValue?: any): any {
    return getParamValue(this.event.queryStringParameters, key, defaultValue);
  }
}
