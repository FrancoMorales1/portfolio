import * as Yup from "yup"

export const contactSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  subject: Yup.string().required("El asunto es obligatorio"),
  message: Yup.string().min(10, "El mensaje debe tener al menos 10 caracteres").required("El mensaje es obligatorio"),
})
