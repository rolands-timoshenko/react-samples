import { getTitle } from "./resources";

describe("Resources", () => {
  describe("getTitle", () => {
    it("should return turbot title", async () => {
      const resource = {
        turbot: {
          title: "Title"
        }
      };
      expect(getTitle(resource)).toBe("Title");
    });

    it("should return id", async () => {
      const resource = {
        turbot: {
          id: "123456"
        }
      };
      expect(getTitle(resource)).toBe("123456");
    });

    it("should return custom noTitle if no titles or ID", async () => {
      expect(getTitle({}, "Other title")).toBe("Other title");
    });

    it("should return null if no titles, ID or noTitle set", async () => {
      expect(getTitle({})).toBe(null);
    });
  });
});
