import { Formatter } from "./type";
import { ErrorStatuses } from "../error";

export const JSON_HEADERS = {
  "Content-Type": "application/json",
};

/**
 * json formatter
 * @param statusCode
 * @param body
 */
export const jsonFormatter: Formatter = ({statusCode, body}) => {
  const status = ErrorStatuses[statusCode];
  if (status) {
    let message;
    switch (typeof body) {
      case "string":
        message = body;
        break;
      case "object":
        message = body.message;
        break;
    }

    body = {
      status,
      message,
    };
  }

  return {
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  };
};