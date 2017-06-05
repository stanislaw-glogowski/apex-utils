export type ApexCallback = (err: any, data: any) => void;
export type ApexHandler = (event: {}, context: {}, callback: ApexCallback) => void;

export interface ILambdaHandlerParams {
  event: {};
  context: {};
}

export type LambdaHandler = (params: ILambdaHandlerParams) => Promise<any> | any;

/**
 * creates lambda
 * @param handler
 * @return ApexHandler
 */
export function createLambda(handler: LambdaHandler): ApexHandler {
  return (event, context, callback) => {
    Promise
      .resolve(null)
      .then(() => handler({
        event,
        context,
      }))
      .then((data) => callback(null, data))
      .catch((err) => callback(err, null));
  };
}
