type Rule<T = string> = (val: T) => string | undefined;

export const validateField = (
  fieldName: string,
  rules: Rule[],
  formEl: Element
) => {
  const inputEl = formEl?.querySelector(
    `input[name="${fieldName}"`
  ) as HTMLInputElement;
  const value = inputEl.value;
  let errEl = formEl?.querySelector(`div[error-for="${fieldName}"]`);
  if (!errEl) {
    errEl = document.createElement('div');
    errEl.setAttribute('error-for', fieldName);
    inputEl.after(errEl);
  }
  errEl.innerText = '';
  inputEl?.classList.remove('error');
  let rule;
  let error;
  for (rule of rules) {
    error = rule(value);
    if (error) {
      errEl.innerText = error;
      inputEl?.classList.add('error');
      return error;
    }
  }
};
