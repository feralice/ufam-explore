export const isNameValid = (name: string): boolean => {
  return /^[a-zA-Z ]+$/.test(name);
};

export const isUsernameValid = (username: string): boolean => {
  return /^[a-zA-Z0-9_]{4,}$/.test(username);
};

export const isEmailValid = (email: string): boolean => {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email);
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
