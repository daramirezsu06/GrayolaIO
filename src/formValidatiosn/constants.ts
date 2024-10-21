export const fields = {
  name: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: "Debe tener entre 3 y 150 caracteres",
    type: "text",
    required: true,
  },
  description: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ,]{3,255}$/,
    msgError: "Debe tener entre 3 y 255 caracteres",
    type: "text",
    required: true,
  },
  email: {
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    msgError: "Email inválido",
    required: true,
    type: "text",
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*_])/,
    msgError:
      "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un caracter (!@#$%^&*_)",
    required: true,
    type: "text",
  },
  confPassword: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*_])/,
    msgError:
      "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un caracter (!@#$%^&*_)",
    required: true,
    type: "text",
  },

  phone_number: {
    regex: /^[0-9()+-]{8,15}$/,
    msgError: "Solo números y guiones",
    required: true,
    type: "text",
  },
  role: {
    regex: /^(customer|designer|manager)$/,
    msgError: "El rol debe ser uno de: cliente, diseñador o gerente.",
    required: true,
    type: "text",
  },
  company: {
    regex: /^.{3,}$/, // Asegura que haya al menos 3 caracteres
    msgError: "El nombre de la empresa debe tener al menos 3 caracteres.",
    required: false,
    type: "text",
  },
  title: {
    regex: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]{3,150}$/,
    msgError: "Debe tener entre 3 y 150 caracteres",
    type: "text",
    required: true,
  },
};
