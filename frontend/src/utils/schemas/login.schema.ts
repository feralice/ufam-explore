import * as yup from "yup";

export const LoginSchema = yup.object().shape({
   email: yup
     .string()
     .email("Formato de e-mail inválido")
     .required("Campo obrigatório"),
   password: yup.string().nullable().required("Campo obrigatório"),
 });
 