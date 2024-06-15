import * as yup from "yup";

export const createEventSchema = yup.object().shape({
  dataInicio: yup
    .string()
    .required("A data e hora inicial são obrigatórias")
    .typeError("Formato de data inválido"),
  dataFinal: yup
    .string()
    .required("A data e hora final são obrigatórias")
    .typeError("Formato de data inválido")
    .when("dataInicio", (dataInicio, schema) => {
      return schema.test({
        test: function (value) {
          const dataInicioDate = new Date(dataInicio.toString());
          const dataFinalDate = new Date(value.toString());
          return dataFinalDate > dataInicioDate;
        },
        message: "A data final deve ser posterior à data inicial",
      });
    }),
  titulo: yup.string().required("O título é obrigatório"),
  descricao: yup.string(),
  localizacao: yup.string().required("A localização é obrigatória"),
});
