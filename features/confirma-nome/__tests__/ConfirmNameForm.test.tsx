import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ConfirmNameForm } from "../components/ConfirmNameForm";
import { confirmName } from "../services/confirm-name-service";

vi.mock("../services/confirm-name-service", () => ({
  confirmName: vi.fn(),
}));

vi.mock("@/services/firebase/firebase-client", async () => {
  const actual = await vi.importActual<
    typeof import("@/services/firebase/firebase-client")
  >("@/services/firebase/firebase-client");

  return actual;
});

const confirmNameMock = vi.mocked(confirmName);

describe("ConfirmNameForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza somente um input e um botão de confirmar", () => {
    render(<ConfirmNameForm />);

    expect(screen.getAllByRole("textbox")).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: "Confirmar" })).toHaveLength(
      1,
    );
    expect(
      screen.getByRole("link", { name: "Ler regras" }).getAttribute("href"),
    ).toBe("/regras");
  });

  it("usa tema escuro e largura mobile-first", () => {
    render(<ConfirmNameForm />);

    const page = screen.getByTestId("confirm-name-page");
    const form = screen.getByRole("form", { name: "Confirmar nome" });
    const button = screen.getByRole("button", { name: "Confirmar" });

    expect(page.className).toContain("bg-[#0b0f19]");
    expect(page.className).toContain("text-slate-50");
    expect(form.className).toContain("w-full");
    expect(form.className).toContain("max-w-sm");
    expect(button.className).toContain("bg-blue-600");
    expect(button.className).toContain("min-h-14");
  });

  it("valida nome obrigatório sem consultar Firebase", async () => {
    const user = userEvent.setup();

    render(<ConfirmNameForm />);

    await user.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(
      screen.getByText("Informe um nome para confirmar."),
    ).toBeDefined();
    expect(confirmNameMock).not.toHaveBeenCalled();
  });

  it("salva nome novo e mostra sucesso", async () => {
    const user = userEvent.setup();
    confirmNameMock.mockResolvedValue({ status: "saved" });

    render(<ConfirmNameForm />);

    await user.type(screen.getByRole("textbox", { name: "Nome" }), "Carlos");
    await user.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(confirmNameMock).toHaveBeenCalledWith("Carlos", "carlos");
    expect(
      await screen.findByText("Nome confirmado e salvo com sucesso."),
    ).toBeDefined();
  });

  it("não salva novamente quando o nome já existe e mostra duplicidade", async () => {
    const user = userEvent.setup();
    confirmNameMock.mockResolvedValue({ status: "duplicated" });

    render(<ConfirmNameForm />);

    await user.type(screen.getByRole("textbox", { name: "Nome" }), "Carlos");
    await user.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(confirmNameMock).toHaveBeenCalledWith("Carlos", "carlos");
    expect(
      await screen.findByText(
        "Esse nome já foi confirmado. Escolha outro nome.",
      ),
    ).toBeDefined();
  });

  it("mostra erro quando a consulta falha", async () => {
    const user = userEvent.setup();
    confirmNameMock.mockRejectedValue(new Error("query failed"));

    render(<ConfirmNameForm />);

    await user.type(screen.getByRole("textbox", { name: "Nome" }), "Carlos");
    await user.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(
      await screen.findByText(
        "Ocorreu um erro ao consultar ou salvar o nome. Tente novamente.",
      ),
    ).toBeDefined();
  });

  it("mostra erro quando o salvamento falha", async () => {
    const user = userEvent.setup();
    confirmNameMock.mockRejectedValue(new Error("save failed"));

    render(<ConfirmNameForm />);

    await user.type(screen.getByRole("textbox", { name: "Nome" }), "Carlos");
    await user.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(
      await screen.findByText(
        "Ocorreu um erro ao consultar ou salvar o nome. Tente novamente.",
      ),
    ).toBeDefined();
  });

  it("mostra erro específico quando a configuração do Firebase está incompleta", async () => {
    const user = userEvent.setup();
    const { FirebaseClientConfigError } = await import(
      "@/services/firebase/firebase-client"
    );
    confirmNameMock.mockRejectedValue(
      new FirebaseClientConfigError(["NEXT_PUBLIC_FIREBASE_API_KEY"]),
    );

    render(<ConfirmNameForm />);

    await user.type(screen.getByRole("textbox", { name: "Nome" }), "Carlos");
    await user.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(
      await screen.findByText(
        "Configuração do Firebase incompleta. Verifique as variáveis de ambiente.",
      ),
    ).toBeDefined();
  });
});
