export type IParams = { [key: string]: any } | null;

export interface IIncomingEvent {
  httpMethod: string;
  pathParameters: IParams;
  queryStringParameters: IParams;
}

export interface IOutgoingEvent {
  statusCode?: number;
  headers?: { [key: string]: string | boolean };
  body?: string;
}

/**
 * gets value from incoming event params
 * @param params
 * @param key
 * @param defaultValue
 * @return {any}
 */
export function getParamValue(params: IParams, key: string, defaultValue?: any): any {
  return (params && typeof params === "object") ? params[key] || defaultValue : defaultValue;
}
