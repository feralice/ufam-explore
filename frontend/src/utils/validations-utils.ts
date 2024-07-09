export const isNameValid = (name: string): boolean => {
  return /^[a-zA-ZÀ-ÿ ]+$/.test(name);
};

export const isUsernameValid = (username: string): boolean => {
  return /^[a-zA-Z0-9_]{3,}$/.test(username);
};

export const isEmailValid = (email: string): boolean => {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email);
};

export const isEmailValidUfam = (email: string): boolean => {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
  if (!emailPattern.test(email)) {
    return false;
  }

  const emailDomain = email.split("@")[1];
  return emailDomain !== undefined && emailDomain.includes("ufam");
};

export const isPasswordValid = (password: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
};

export const passwordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};
