import {
  get,
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";

import {
  assertFirebaseClientConfig,
  getFirebaseClientApp,
} from "./firebase-client";

export const NAMES_PATH = "names";
export const RULES_PATH = "rules";

export type RealtimeNameRecord = {
  value: string;
  normalizedValue: string;
  createdAt: ReturnType<typeof serverTimestamp>;
};

export type RealtimeRuleRecord = {
  id: string;
  text: string;
};

function getRealtimeDatabase() {
  assertFirebaseClientConfig();

  return getDatabase(getFirebaseClientApp());
}

export async function findNameByNormalizedValue(
  normalizedValue: string,
): Promise<boolean> {
  const database = getRealtimeDatabase();
  const namesRef = ref(database, NAMES_PATH);
  const snapshot = await get(namesRef);

  if (!snapshot.exists()) {
    return false;
  }

  const names = snapshot.val() as Record<
    string,
    { normalizedValue?: string } | null
  >;

  return Object.values(names).some(
    (nameRecord) => nameRecord?.normalizedValue === normalizedValue,
  );
}

export async function saveNameRecord(
  value: string,
  normalizedValue: string,
): Promise<void> {
  const database = getRealtimeDatabase();
  const newNameRef = push(ref(database, NAMES_PATH));
  const record: RealtimeNameRecord = {
    value,
    normalizedValue,
    createdAt: serverTimestamp(),
  };

  await set(newNameRef, record);
}

export async function getRulesRecords(): Promise<RealtimeRuleRecord[]> {
  const database = getRealtimeDatabase();
  const snapshot = await get(ref(database, RULES_PATH));

  if (!snapshot.exists()) {
    return [];
  }

  const rules = snapshot.val() as Record<string, unknown>;

  return Object.entries(rules)
    .filter(([, value]) => typeof value === "string" && value.trim())
    .map(([id, text]) => ({
      id: id.trim(),
      text: String(text).trim(),
    }))
    .sort((firstRule, secondRule) => {
      const firstId = Number.parseInt(firstRule.id, 10);
      const secondId = Number.parseInt(secondRule.id, 10);

      if (Number.isNaN(firstId) || Number.isNaN(secondId)) {
        return firstRule.id.localeCompare(secondRule.id, "pt-BR");
      }

      return firstId - secondId;
    });
}
