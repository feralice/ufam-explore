export const validatePassword = (value: string) => {
  let hasUpperCase = /[A-Z]/.test(value);
  let hasLowerCase = /[a-z]/.test(value);
  let hasDigit = /[0-9]/.test(value);
  let hasSpecialChar = /[^A-Za-z0-9]/.test(value);

  if (value.length < 8) {
    return "Senha deve ter pelo menos 8 caracteres";
  } else if (!hasUpperCase) {
    return "Senha deve ter pelo menos um caractere maiúsculo";
  } else if (!hasLowerCase) {
    return "Senha deve ter pelo menos um caractere minúsculo";
  } else if (!hasDigit) {
    return "Senha deve conter pelo menos um número";
  } else if (!hasSpecialChar) {
    return "Senha deve conter pelo menos um caractere especial";
  }

  return true;
};
