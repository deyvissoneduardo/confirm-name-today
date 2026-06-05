import { describe, expect, it } from "vitest";

import {
  getFirstName,
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

  it("extrai somente o primeiro nome", () => {
    expect(getFirstName("Jonathan (Jon Jon)")).toBe("Jonathan");
    expect(getFirstName("  Maria   Silva  ")).toBe("Maria");
  });

  it("valida usando somente o primeiro nome", () => {
    expect(validateName("Jonathan (Jon Jon)")).toEqual({
      valid: true,
      value: "Jonathan",
      normalizedValue: "jonathan",
    });
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
