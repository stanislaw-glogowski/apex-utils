import { createLambda } from "./lambda";

describe("event", () => {
  test("passing into handler", (done) => {
    const event = "foo";
    const lambda = createLambda((params) => {
      expect(event).toBe(params.event);
      done();
    });

    lambda(event, {}, () => null);
  });
});

describe("context", () => {
  test("passing into handler", (done) => {
    const context = "foo";
    const lambda = createLambda((params) => {
      expect(context).toBe(params.context);
      done();
    });

    lambda(null, context, () => null);
  });
});

describe("callback", () => {
  test("calling with data returned from handler", (done) => {
    const lambda = createLambda(() => "foo");
    const callback = (err, data) => {
      expect(data).toBe("foo");
      expect(err).toBeNull();
      done();
    };

    lambda({}, {}, callback);
  });

  test("calling with err throwed from handler", (done) => {
    const err = new Error("bar");
    const lambda = createLambda(() => {
      throw err;
    });
    const callback = (err, data) => {
      expect(err).toBe(err);
      expect(data).toBeNull();
      done();
    };

    lambda(null, null, callback);
  });

  test("calling with data resolved from handler", (done) => {
    const lambda = createLambda(() => Promise.resolve("foo"));
    const callback = (err, data) => {
      expect(err).toBeNull();
      expect(data).toBe("foo");
      done();
    };

    lambda(null, null, callback);
  });

  test("calling with err rejected from handler", (done) => {
    const lambda = createLambda(() => Promise.reject("bar"));
    const callback = (err, data) => {
      expect(err).toBe("bar");
      expect(data).toBeNull();
      done();
    };

    lambda(null, null, callback);
  });
});
