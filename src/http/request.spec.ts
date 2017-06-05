import { IIncomingEvent } from "./event";
import { Request } from "./request";

const event: IIncomingEvent = {
  httpMethod: "GET",
  pathParameters: null,
  queryStringParameters: {
    foo: "bar",
  },
};

const request = new Request(event);

test("getting method name", () => {
  expect(request.method).toBe(event.httpMethod);
});

test("getting default param value", () => {
  expect(request.param("bar", "foo")).toBe("foo");
});

test("getting undefined param value", () => {
  expect(request.param("bar")).toBeUndefined();
});

test("getting existing query value", () => {
  expect(request.query("foo")).toBe("bar");
});
