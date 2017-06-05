import { createCorsFormatter, HEADER_ALLOW_CREDENTIALS, HEADER_ALLOW_ORIGIN } from "./cors";

describe("formatter created with default options", () => {
  const formatter = createCorsFormatter();

  test("calling with empty event", () => {
    expect(formatter({})).toEqual({
      headers: {
        [HEADER_ALLOW_CREDENTIALS]: true,
        [HEADER_ALLOW_ORIGIN]: "*",
      },
    });
  });
});

describe("formatter created with origin and credentials options", () => {
  const options = {
    origin: "foo",
    credentials: false,
  };
  const formatter = createCorsFormatter(options);

  test("calling with empty event", () => {
    expect(formatter({})).toEqual({
      headers: {
        [HEADER_ALLOW_CREDENTIALS]: options.credentials,
        [HEADER_ALLOW_ORIGIN]: options.origin,
      },
    });
  });
});