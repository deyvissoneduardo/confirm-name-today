"use client";

import { useEffect, useState } from "react";

import { isFirebaseClientConfigError } from "@/services/firebase/firebase-client";

import { readRules } from "../services/rules-service";
import type { RuleItem } from "../types/rules";

type UseRulesState = {
  rules: RuleItem[];
  isLoading: boolean;
  error: string | null;
};

const RULES_ERROR_MESSAGE =
  "Não foi possível carregar as regras. Tente novamente.";
const FIREBASE_CONFIG_ERROR_MESSAGE =
  "Configuração do Firebase incompleta. Verifique as variáveis de ambiente.";

export function useRules() {
  const [state, setState] = useState<UseRulesState>({
    rules: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isActive = true;

    async function loadRules() {
      try {
        const rules = await readRules();

        if (!isActive) {
          return;
        }

        setState({
          rules,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        setState({
          rules: [],
          isLoading: false,
          error: isFirebaseClientConfigError(error)
            ? FIREBASE_CONFIG_ERROR_MESSAGE
            : RULES_ERROR_MESSAGE,
        });
      }
    }

    void loadRules();

    return () => {
      isActive = false;
    };
  }, []);

  return state;
}
