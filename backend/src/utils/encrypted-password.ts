import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export function encryptPassword(password: string) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}
