import { Requirement } from "./types";

export const requirements: Requirement[] = [
  {
    label: "Senha não pode ser nula",
    test: (pw) => pw.length > 0,
  },
  {
    label: "Senha deve ter pelo menos 8 caracteres",
    test: (pw) => pw.length >= 8,
  },
  {
    label: "Senha deve ter pelo menos um caractere maiúsculo",
    test: (pw) => /[A-Z]/.test(pw),
  },
  {
    label: "Senha deve ter pelo menos um caractere minúsculo",
    test: (pw) => /[a-z]/.test(pw),
  },
  {
    label: "Senha deve conter pelo menos um número",
    test: (pw) => /[0-9]/.test(pw),
  },
  {
    label: "Senha deve conter pelo menos um caractere especial",
    test: (pw) => /[^A-Za-z0-9]/.test(pw),
  },
];
