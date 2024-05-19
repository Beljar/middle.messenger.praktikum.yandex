import { validateField } from './validateField/validateField';

type Rule<T = string> = (val: T) => string | undefined;

export const addBlurValidation = (
  fieldName: string,
  rules: Rule[],
  formEl: Element,
  type: string = 'input'
) => {
  const inputEl = formEl?.querySelector(`${type}[name="${fieldName}"`);
  console.log(inputEl);
  inputEl?.addEventListener('blur', () => {
    validateField(fieldName, rules, formEl, type);
  });
};
