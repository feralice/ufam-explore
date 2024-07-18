import { useEffect, useState } from 'react';
import {
  isEmailValid,
  isEmailValidUfam,
  isNameValid,
  isUsernameValid,
} from '../../../utils/validations-utils';

export const useValidation = (
  nome: string,
  username: string,
  email: string,
  perfilId: number
) => {
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setNameError(
      nome && !isNameValid(nome)
        ? 'Nome inválido. Use apenas letras e espaços.'
        : ''
    );
  }, [nome]);

  useEffect(() => {
    setUsernameError(
      username && !isUsernameValid(username)
        ? 'Nome de usuário inválido. Use apenas letras, números e sublinhados, e deve ter pelo menos 3 caracteres.'
        : ''
    );
  }, [username]);

  useEffect(() => {
    const emailIsValid =
      perfilId === 1 ? isEmailValidUfam(email) : isEmailValid(email);
    setEmailError(
      email && !emailIsValid
        ? perfilId === 1
          ? 'O e-mail deve ser institucional da UFAM.'
          : 'O e-mail não é válido.'
        : ''
    );
  }, [email, perfilId]);

  return { nameError, usernameError, emailError };
};
