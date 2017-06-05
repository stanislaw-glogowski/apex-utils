import { getParamValue } from "./event";

test("getting existing param value", () => {
  expect(getParamValue({foo: "bar"}, "foo")).toBe("bar");
});

test("getting undefined param value", () => {
  expect(getParamValue(null, "foo")).toBeUndefined();
  expect(getParamValue({}, "foo")).toBeUndefined();
});

test("getting default param value", () => {
  expect(getParamValue(null, "foo", "bar")).toBe("bar");
  expect(getParamValue({}, "foo", "bar")).toBe("bar");
});
