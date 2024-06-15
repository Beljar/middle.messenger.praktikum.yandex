export const getValidatePasswordRepeatCoincidesFn =
  (formId: string) => (repeatedPassword: string) => {
    const passwordField = document.querySelector(
      `#${formId} input[name="password"]`
    );
    if (!passwordField || !('value' in passwordField)) return;
    const password = passwordField?.value;
    return repeatedPassword === password ? undefined : 'пароли не совпадают';
  };
