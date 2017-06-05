import { defaultFormatter, DEFAULT_STATUS, DEFAULT_HEADERS, DEFAULT_BODY } from "./default";

test("calling with empty event", () => {
  expect(defaultFormatter({})).toEqual({
    statusCode: DEFAULT_STATUS,
    headers: DEFAULT_HEADERS,
    body: DEFAULT_BODY,
  });
});

test("calling with statusCode, headers and body", () => {
  const statusCode = 400;
  const headers = {
    Foo: "bar",
  };
  const body = "foo";

  expect(defaultFormatter({statusCode, headers, body})).toEqual({
    statusCode,
    headers,
    body: DEFAULT_BODY,
  });
});