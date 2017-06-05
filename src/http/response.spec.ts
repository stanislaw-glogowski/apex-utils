import { Response } from "./response";

let response;

beforeEach(() => {
  response = new Response([
    ({}) => ({headers: {bar: "foo"}}),
    ({body}) => ({body: JSON.stringify(body)}),
  ]);
});

test("checking initial hasErrorStatusCode flag", () => {
  expect(response.hasErrorStatusCode).toBeFalsy();
});

test("setting status", () => {
  response.status(400);
  expect(response.format().statusCode).toBe(400);
});

test("setting custom header", () => {
  response.header("foo", "bar");
  expect(response.format().headers).toMatchObject({
    foo: "bar",
  });
});

test("calling error with status", () => {
  response.error(400);
  expect(response.hasErrorStatusCode).toBeTruthy();
  expect(response.format().body).toBeUndefined();
});

test("calling error with status and body", () => {
  response.error(400, "err");
  expect(response.hasErrorStatusCode).toBeTruthy();
  expect(response.format().statusCode).toBe(400);
  expect(response.format().body).toBe(JSON.stringify("err"));
});

test("calling send without body", () => {
  response.send();
  expect(response.format().body).toBeUndefined();
});

test("calling send with body", () => {
  response.send("foo");
  expect(response.format().body).toBe(JSON.stringify("foo"));
});

test("calling format after setting status, header and body", () => {
  response
    .status(201)
    .header("foo", "bar")
    .send("foo");

  expect(response.format()).toEqual({
    statusCode: 201,
    headers: {
      foo: "bar",
      bar: "foo",
    },
    body: JSON.stringify("foo"),
  });
});
