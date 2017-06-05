import { jsonFormatter, JSON_HEADERS } from "./json";
import { ErrorStatuses } from "../error";

test("calling with empty event", () => {
  expect(jsonFormatter({})).toEqual({
    headers: JSON_HEADERS,
  });
});

test("calling with body", () => {
  const body = {
    foo: "bar",
  };
  expect(jsonFormatter({body})).toEqual({
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });
});

test("calling with error statusCode", () => {
  const statusCode = 400;

  expect(jsonFormatter({statusCode})).toEqual({
    headers: JSON_HEADERS,
    body: JSON.stringify({
      status: ErrorStatuses[statusCode],
    }),
  });
});

test("calling with error statusCode and string body", () => {
  const statusCode = 400;
  const body = "foo";

  expect(jsonFormatter({statusCode, body})).toEqual({
    headers: JSON_HEADERS,
    body: JSON.stringify({
      status: ErrorStatuses[statusCode],
      message: body,
    }),
  });
});

test("calling with error statusCode and error body", () => {
  const statusCode = 400;
  const body = new Error("foo");

  expect(jsonFormatter({statusCode, body})).toEqual({
    headers: JSON_HEADERS,
    body: JSON.stringify({
      status: ErrorStatuses[statusCode],
      message: body.message,
    }),
  });
});