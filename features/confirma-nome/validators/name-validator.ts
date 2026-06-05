export type NameValidationResult =
  | {
      valid: true;
      value: string;
      normalizedValue: string;
    }
  | {
      valid: false;
      message: string;
    };

export const REQUIRED_NAME_MESSAGE = "Informe um nome para confirmar.";

export function getFirstName(value: string): string {
  return value.trim().split(/\s+/)[0] ?? "";
}

export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
}

export function validateName(value: string): NameValidationResult {
  const trimmedValue = value.trim();
  const firstName = getFirstName(trimmedValue);

  if (!firstName) {
    return {
      valid: false,
      message: REQUIRED_NAME_MESSAGE,
    };
  }

  return {
    valid: true,
    value: firstName,
    normalizedValue: normalizeName(firstName),
  };
}
