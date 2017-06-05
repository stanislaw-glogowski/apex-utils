import { LambdaHandler } from "../lambda";
import { Request, IRequest } from "./request";
import { Response, IResponse } from "./response";
import { Formatter } from "./response/formatter";
import { ErrorStatuses } from "./response/error";
import { IIncomingEvent } from "./event";

export interface IHandlerParams {
  req?: IRequest;
  res?: IResponse;
  event?: {};
  context?: {};
}

export type Handler = (params: IHandlerParams) => Promise<any> | any;
export type HandlerCreator = (handler: Handler) => LambdaHandler;

export interface IHandlerCreatorOptions {
  formatters?: Formatter[];
  middleware?: Handler;
}

/**
 * build handler creator
 * @param options
 * @return HandlerCreator
 */
export function buildHandlerCreator(options: IHandlerCreatorOptions = {}): HandlerCreator {
  options = Object.assign({
    formatters: [],
    middleware: ({}) => Promise.resolve([]),
  }, options);

  return (handler: Handler) => async ({event, context}) => {
    const res = new Response(options.formatters);

    try {
      const req = new Request(event as IIncomingEvent);
      const params = {req, res, event, context};

      await Promise.resolve(options.middleware(params));

      if (!res.hasErrorStatusCode) {
        res.send(await Promise.resolve(handler(params)));
      }
    } catch (err) {
      res.error(ErrorStatuses.InternalServerError, err);
    }

    const outgoingEvent = res.format();

    if (res.hasErrorStatusCode) {
      throw outgoingEvent;
    }

    return outgoingEvent;
  };
}
