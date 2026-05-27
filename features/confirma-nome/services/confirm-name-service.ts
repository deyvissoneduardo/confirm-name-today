import {
  findNameByNormalizedValue,
  saveNameRecord,
} from "@/services/firebase/realtime-database";

import type { ConfirmNameResult } from "../types/confirm-name";

export async function confirmName(
  value: string,
  normalizedValue: string,
): Promise<ConfirmNameResult> {
  const nameAlreadyExists = await findNameByNormalizedValue(normalizedValue);

  if (nameAlreadyExists) {
    return {
      status: "duplicated",
    };
  }

  await saveNameRecord(value, normalizedValue);

  return {
    status: "saved",
  };
}
