import { buildHandlerCreator } from "./handler";

const formatters = [
  ({body}) => ({body: body as string}),
];

describe("creator without middleware", () => {
  const createHandler = buildHandlerCreator({formatters});

  test("calling handler which returns body", async () => {
    const handler = createHandler(() => "foo");
    const event = await handler({event: {}, context: {}});

    expect(event).toEqual({
      statusCode: 200,
      headers: {},
      body: "foo",
    });
  });

  test("calling handler which throws error", async () => {
    expect.assertions(1);
    const err = "error";
    const handler = createHandler(() => {
      throw err;
    });
    const event = await handler({event: {}, context: {}});

    expect(event).toEqual({
      statusCode: 500,
      headers: {},
      body: err,
    });
  });

  test("calling handler which resolves body", async () => {
    const handler = createHandler(() => Promise.resolve("foo"));
    const event = await handler({event: {}, context: {}});

    expect(event).toEqual({
      statusCode: 200,
      headers: {},
      body: "foo",
    });
  });

  test("calling handler which rejects error", async () => {
    expect.assertions(1);
    const handler = createHandler(() => Promise.reject("error"));
    const event = await handler({event: {}, context: {}});

    expect(event).toEqual({
      statusCode: 500,
      headers: {},
      body: "error",
    });
  });

  test("setting response status", async () => {
    const handler = createHandler(({res}) => {
      res.status(201);
    });
    const event = await handler({event: {}, context: {}});

    expect(event).toEqual({
      statusCode: 201,
      headers: {},
    });
  });

  test("getting request method", async () => {
    const handler = createHandler(({req}) => {
      expect(req.method).toBe("POST");
    });

    await handler({event: {httpMethod: "POST"}, context: {}});
  });
});

describe("creator with middleware", () => {
  describe("middleware", () => {
    test("passing data to handler", async () => {
      const createHandler = buildHandlerCreator({
        formatters, middleware: ({context}) => {
          Object.assign(context, {
            foo: "bar",
          });
        },
      });
      const handler = createHandler(({context}) => {
        expect(context.foo).toBe("bar");
      });

      await handler({event: {}, context: {}});
    });

    test("omitting handler when hasErrorStatusCode flag is set to true", async () => {
      const createHandler = buildHandlerCreator({
        formatters, middleware: ({res}) => {
          res.status(500);
        },
      });
      const mock = jest.fn();
      const handler = createHandler(mock);
      await handler({event: {}, context: {}});

      expect(mock).not.toBeCalled();
    });

    test("setting response status", async () => {
      const createHandler = buildHandlerCreator({
        formatters, middleware: ({res}) => {
          res.status(201);
        },
      });
      const mock = jest.fn();
      const handler = createHandler(mock);
      const event = await handler({event: {}, context: {}});

      expect(event).toEqual({
        statusCode: 201,
        headers: {},
      });

      expect(mock).toBeCalled();
    });

    test("getting request method", async () => {
      const createHandler = buildHandlerCreator({
        formatters, middleware: ({req}) => {
          expect(req.method).toBe("POST");
        },
      });
      const mock = jest.fn();
      const handler = createHandler(mock);

      await handler({event: {httpMethod: "POST"}, context: {}});
      expect(mock).toBeCalled();
    });
  });
});
