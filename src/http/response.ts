import { IOutgoingEvent } from "./event";
import { IResponseData } from "./response/data";
import { Formatter, defaultFormatter } from "./response/formatter";
import { ErrorStatuses } from "./response/error";

export interface IResponse {
  hasErrorStatusCode: boolean;
  status(statusCode: number): this;
  header(name: string, value: string | boolean): this;
  error(statusCode: number, error?: any): void;
  send(body?: string): void;
  format(formatters: Formatter[]): IOutgoingEvent;
}

export class Response implements IResponse {
  private data: IResponseData = {};

  constructor(private formatters: Formatter[] = []) {
    //
  }

  get hasErrorStatusCode() {
    const {statusCode} = this.data;
    return statusCode && !!ErrorStatuses[statusCode];
  }

  public status(statusCode: number) {
    this.data.statusCode = statusCode;
    return this;
  }

  public header(name: string, value: string | boolean) {
    if (!this.data.headers) {
      this.data.headers = {};
    }
    this.data.headers[name] = value;
    return this;
  }

  public error(status: number, body?: any) {
    this.status(status).send(body);
  }

  public send(body?: any) {
    if (body) {
      this.data.body = body;
    }
  }

  public format() {
    return this.formatters.reduce(
      (previous: IOutgoingEvent, formatter) => {
        const current = formatter(this.data);
        current.headers = Object.assign({}, previous.headers, current.headers);
        return Object.assign(previous, current);
      },
      defaultFormatter(this.data),
    );
  }
}