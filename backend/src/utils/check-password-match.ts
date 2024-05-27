import { compare } from 'bcrypt';

export async function checkPasswordMatch(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await compare(password, hashedPassword);
}
