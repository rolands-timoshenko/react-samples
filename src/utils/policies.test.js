import { isPolicyReadOnly } from "./policies";

describe("Policies", () => {
  describe("isPolicyReadOnly", () => {
    it("should return true when policy type has readonly true", async () => {
      const policyType = {
        readOnly: true
      };
      expect(isPolicyReadOnly(policyType)).toBe(true);
    });

    it("should return false when policy type has readonly false", async () => {
      const policyType = {
        readOnly: false
      };
      expect(isPolicyReadOnly(policyType)).toBe(false);
    });

    it("should return false when policy type has null readOnly", async () => {
      const policyType = {
        readOnly: null
      };
      expect(isPolicyReadOnly(policyType)).toBe(false);
    });

    it("should return false when policy type has no readOnly properties", async () => {
      const policyType = {};
      expect(isPolicyReadOnly(policyType)).toBe(false);
    });
  });
});
