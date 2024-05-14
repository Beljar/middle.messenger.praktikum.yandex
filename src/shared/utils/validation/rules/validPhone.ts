export const validPhone = (val: string) => {
  return /\+?[0-9]{10,15}/.test(val)
    ? undefined
    : 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.';
};
