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

export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
}

export function validateName(value: string): NameValidationResult {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return {
      valid: false,
      message: REQUIRED_NAME_MESSAGE,
    };
  }

  return {
    valid: true,
    value: trimmedValue,
    normalizedValue: normalizeName(trimmedValue),
  };
}
