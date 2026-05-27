import { beforeEach, describe, expect, it, vi } from "vitest";

import { getRulesRecords } from "@/services/firebase/realtime-database";

import { readRules } from "../services/rules-service";

vi.mock("@/services/firebase/realtime-database", () => ({
  getRulesRecords: vi.fn(),
}));

const getRulesRecordsMock = vi.mocked(getRulesRecords);

describe("readRules", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("somente lê regras do Realtime Database", async () => {
    getRulesRecordsMock.mockResolvedValue([
      { id: "01", text: "Não Vale Recuada" },
    ]);

    await expect(readRules()).resolves.toEqual([
      { id: "01", text: "Não Vale Recuada" },
    ]);
    expect(getRulesRecordsMock).toHaveBeenCalledOnce();
  });
});
