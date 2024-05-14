import { validateField } from './validateField/validateField';

type Rule<T = string> = (val: T) => string | undefined;

export const validateForm = (
  formEl: Element,
  fields: { name: string; rules: Rule[] }[]
) => {
  return fields.reduce(
    (acc, field) => {
      const error = validateField(field.name, field.rules, formEl);
      if (error) {
        acc[field.name] = error;
      }
      return acc;
    },
    {} as Record<string, string>
  );
};
