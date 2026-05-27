import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { RulesView } from "../components/RulesView";
import { readRules } from "../services/rules-service";

vi.mock("../services/rules-service", () => ({
  readRules: vi.fn(),
}));

const readRulesMock = vi.mocked(readRules);

describe("RulesView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("carrega e renderiza regras em modo somente leitura", async () => {
    readRulesMock.mockResolvedValue([
      { id: "01", text: "Não Vale Recuada" },
      { id: "02", text: "Bola alta se bater na rede, segue o jogo" },
    ]);

    render(<RulesView />);

    expect(screen.getByText("Carregando regras...")).toBeDefined();
    expect(await screen.findByText("Não Vale Recuada")).toBeDefined();
    expect(
      screen.getByText("Bola alta se bater na rede, segue o jogo"),
    ).toBeDefined();
    expect(
      screen
        .getByRole("link", { name: "Voltar para confirmar nome" })
        .getAttribute("href"),
    ).toBe("/");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("mostra estado vazio quando não existem regras", async () => {
    readRulesMock.mockResolvedValue([]);

    render(<RulesView />);

    expect(await screen.findByText("Nenhuma regra cadastrada.")).toBeDefined();
  });

  it("mostra erro quando a leitura das regras falha", async () => {
    readRulesMock.mockRejectedValue(new Error("read failed"));

    render(<RulesView />);

    expect(
      await screen.findByText(
        "Não foi possível carregar as regras. Tente novamente.",
      ),
    ).toBeDefined();
  });
});
