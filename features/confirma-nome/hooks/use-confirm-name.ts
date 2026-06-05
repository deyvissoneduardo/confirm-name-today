"use client";

import { useState } from "react";

import { isFirebaseClientConfigError } from "@/services/firebase/firebase-client";

import { confirmName } from "../services/confirm-name-service";
import type { ConfirmNameMessage } from "../types/confirm-name";
import { validateName } from "../validators/name-validator";

const DUPLICATED_NAME_MESSAGE =
  "Esse nome já foi confirmado. Escolha outro nome.";
const SUCCESS_MESSAGE = "Nome confirmado e salvo com sucesso.";
const FIREBASE_CONFIG_ERROR_MESSAGE =
  "Configuração do Firebase incompleta. Verifique as variáveis de ambiente.";
const FIREBASE_ERROR_MESSAGE =
  "Ocorreu um erro ao consultar ou salvar o nome. Tente novamente.";

export function useConfirmName() {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<ConfirmNameMessage | null>(null);

  async function handleConfirmName() {
    const validation = validateName(name);

    if (!validation.valid) {
      setMessage({
        type: "error",
        text: validation.message,
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await confirmName(
        validation.value,
        validation.normalizedValue,
      );

      if (result.status === "duplicated") {
        setMessage({
          type: "error",
          text: DUPLICATED_NAME_MESSAGE,
        });
        return;
      }

      setName("");
      setMessage({
        type: "success",
        text: SUCCESS_MESSAGE,
      });
    } catch (error) {
      if (isFirebaseClientConfigError(error)) {
        setMessage({
          type: "error",
          text: FIREBASE_CONFIG_ERROR_MESSAGE,
        });
        return;
      }

      setMessage({
        type: "error",
        text: FIREBASE_ERROR_MESSAGE,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    name,
    setName,
    isSubmitting,
    message,
    handleConfirmName,
  };
}
