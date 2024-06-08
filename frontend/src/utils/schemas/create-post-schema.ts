import * as Yup from "yup";

export const createPostSchema = Yup.object().shape({
  titulo: Yup.string().required("Título é obrigatório"),
  texto: Yup.string().required("Texto é obrigatório"),
});
