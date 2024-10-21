import { fields } from "./constants";
export type FieldKeys = keyof typeof fields;

export const validatefield = (field: FieldKeys, value: string) => {
  console.log("field", field);
  console.log("value", value);

  if (fields[field].required && (!value || value.toString().trim() === ""))
    return "Requerido";

  if (value && !fields[field].regex.test(value)) return fields[field].msgError;

  return null;
};
