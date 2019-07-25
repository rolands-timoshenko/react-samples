import { isNotEmptyString, areObjectsPropertiesEmpty } from "./utils";

describe("Utils", () => {
  describe("isNotEmptyString", () => {
    it("when string is not empty return true", async () => {
      expect(isNotEmptyString("test")).toBe(true);
    });
    it("when string is empty return false", async () => {
      expect(isNotEmptyString("")).toBe(false);
    });
    it("when string is empty with space return false", async () => {
      expect(isNotEmptyString(" ")).toBe(false);
    });
    it("when string is null return false", async () => {
      expect(isNotEmptyString(null)).toBe(false);
    });
  });
  describe("areObjectsPropertiesEmpty", () => {
    it("when object's properties is not empty return false", async () => {
      const obj = {
        alarm: null,
        error: null,
        invalid: null,
        ok: null,
        skipped: null,
        tbd: 1
      };
      expect(areObjectsPropertiesEmpty(obj)).toBe(false);
    });
    it("when object's all properties null return true", async () => {
      const obj = {
        alarm: null,
        error: null,
        invalid: null,
        ok: null,
        skipped: null,
        tbd: null
      };
      expect(areObjectsPropertiesEmpty(obj)).toBe(true);
    });

    it('when object\'s properties contains "" instead of null return true', async () => {
      const obj = {
        alarm: "",
        error: null,
        invalid: null,
        ok: null,
        skipped: "",
        tbd: null
      };
      expect(areObjectsPropertiesEmpty(obj)).toBe(true);
    });
  });
});
