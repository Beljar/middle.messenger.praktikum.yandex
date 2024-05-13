import { validateField } from './validateField/validateField';

type Rule<T = string> = (val: T) => string | undefined;

export const addBlurValidation = (
  fieldName: string,
  rules: Rule[],
  formEl: Element
) => {
  const inputEl = formEl?.querySelector(`input[name="${fieldName}"`);
  inputEl?.addEventListener('blur', () => {
    validateField(fieldName, rules, formEl);
  });
};
