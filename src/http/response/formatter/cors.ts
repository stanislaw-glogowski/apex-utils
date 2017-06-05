import { Formatter } from "./type";

export const HEADER_ALLOW_ORIGIN = "Access-Control-Allow-Origin";
export const HEADER_ALLOW_CREDENTIALS = "Access-Control-Allow-Credentials";

/**
 * creates cors formatter
 * @param options
 * @return {()=>Formatter}
 */
export function createCorsFormatter(options?: { origin?: string, credentials?: boolean }): Formatter {
  options = Object.assign({
    origin: "*",
    credentials: true,
  }, options);

  return () => ({
    headers: {
      [HEADER_ALLOW_ORIGIN]: options.origin,
      [HEADER_ALLOW_CREDENTIALS]: options.credentials,
    },
  });
}