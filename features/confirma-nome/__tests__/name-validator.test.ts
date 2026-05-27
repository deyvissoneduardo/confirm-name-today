import { describe, expect, it } from "vitest";

import {
  normalizeName,
  REQUIRED_NAME_MESSAGE,
  validateName,
} from "../validators/name-validator";

describe("name-validator", () => {
  it("normaliza nome removendo espaços extras e ignorando caixa", () => {
    expect(normalizeName(" João ")).toBe("joão");
    expect(normalizeName("JOÃO")).toBe("joão");
    expect(normalizeName("  Maria   Silva  ")).toBe("maria silva");
  });

  it("valida nome obrigatório", () => {
    expect(validateName("")).toEqual({
      valid: false,
      message: REQUIRED_NAME_MESSAGE,
    });
    expect(validateName("   ")).toEqual({
      valid: false,
      message: REQUIRED_NAME_MESSAGE,
    });
  });
});
