import { beforeEach, describe, expect, it, vi } from "vitest";

import { confirmName } from "../services/confirm-name-service";
import {
  findNameByNormalizedValue,
  saveNameRecord,
} from "@/services/firebase/realtime-database";

vi.mock("@/services/firebase/realtime-database", () => ({
  findNameByNormalizedValue: vi.fn(),
  saveNameRecord: vi.fn(),
}));

const findNameByNormalizedValueMock = vi.mocked(findNameByNormalizedValue);
const saveNameRecordMock = vi.mocked(saveNameRecord);

describe("confirmName", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("consulta antes de salvar e salva quando o nome não existe", async () => {
    findNameByNormalizedValueMock.mockResolvedValue(false);
    saveNameRecordMock.mockResolvedValue();

    await expect(confirmName("Carlos", "carlos")).resolves.toEqual({
      status: "saved",
    });

    expect(findNameByNormalizedValueMock).toHaveBeenCalledWith("carlos");
    expect(saveNameRecordMock).toHaveBeenCalledWith("Carlos", "carlos");
  });

  it("não salva quando o nome já existe", async () => {
    findNameByNormalizedValueMock.mockResolvedValue(true);

    await expect(confirmName("Carlos", "carlos")).resolves.toEqual({
      status: "duplicated",
    });

    expect(findNameByNormalizedValueMock).toHaveBeenCalledWith("carlos");
    expect(saveNameRecordMock).not.toHaveBeenCalled();
  });

  it("propaga erro de consulta", async () => {
    findNameByNormalizedValueMock.mockRejectedValue(new Error("query failed"));

    await expect(confirmName("Carlos", "carlos")).rejects.toThrow(
      "query failed",
    );
    expect(saveNameRecordMock).not.toHaveBeenCalled();
  });

  it("propaga erro de salvamento", async () => {
    findNameByNormalizedValueMock.mockResolvedValue(false);
    saveNameRecordMock.mockRejectedValue(new Error("save failed"));

    await expect(confirmName("Carlos", "carlos")).rejects.toThrow(
      "save failed",
    );
  });
});
