import { Formatter } from "./type";

export const DEFAULT_STATUS = 200;
export const DEFAULT_HEADERS = {};
export const DEFAULT_BODY = "";

/**
 * default formatter
 * @param statusCode
 * @param headers
 */
export const defaultFormatter: Formatter = ({statusCode, headers}) => ({
  statusCode: statusCode || DEFAULT_STATUS,
  headers: headers || DEFAULT_HEADERS,
  body: DEFAULT_BODY,
});
