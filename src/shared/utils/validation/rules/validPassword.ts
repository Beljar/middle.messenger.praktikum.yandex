export const validPassword = (val: string) => {
  const re = new RegExp(`^(?=.*[A-Z].*)(?=.*[0-9].*)(?=^[A-Za-z0-9]{8,40}$)`);
  return re.test(val)
    ? undefined
    : 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.';
};
