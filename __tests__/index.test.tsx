import { fieldNormilize } from "@/app/planet/[id]/page";
import { removeEmptyStringObject } from "@/util/helper";

describe("fieldNormilize function", () => {
  test("normalizes field with underscores", () => {
    expect(fieldNormilize("field_underscores")).toBe("Field Underscores");
  });

  test("normalizes field with mixed casing", () => {
    expect(fieldNormilize("fiElDwiThMIXEDcasINg")).toBe("Fieldwithmixedcasing");
  });
});

describe("removeEmptyStringObject function", () => {
  test("removes properties with empty string values from the object", () => {
    const obj = {
      name: "Test",
      age: "",
      gender: "Male",
      city: "",
    };
    const result = removeEmptyStringObject(obj);
    expect(result).toEqual({
      name: "Test",
      gender: "Male",
    });
  });

  test("does not modify the original object", () => {
    const obj = {
      name: "Test",
      age: "",
      gender: "Male",
      city: "",
    };
    removeEmptyStringObject(obj);
    expect(obj).toEqual({
      name: "Test",
      age: "",
      gender: "Male",
      city: "",
    });
  });

  test("returns an empty object if all properties are empty strings", () => {
    const obj = {
      name: "",
      age: "",
      gender: "",
      city: "",
    };
    const result = removeEmptyStringObject(obj);
    expect(result).toEqual({});
  });

  test("returns the same object if it has no empty string properties", () => {
    const obj = {
      name: "Test",
      age: "30",
      gender: "Male",
      city: "New York",
    };
    const result = removeEmptyStringObject(obj);
    expect(result).toEqual(obj);
  });

  // Add more tests if needed
});
