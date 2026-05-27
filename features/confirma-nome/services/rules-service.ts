import { getRulesRecords } from "@/services/firebase/realtime-database";

import type { RuleItem } from "../types/rules";

export async function readRules(): Promise<RuleItem[]> {
  return getRulesRecords();
}
