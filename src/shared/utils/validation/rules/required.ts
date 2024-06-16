export const required = (val: string) =>
  !val.trim() ? 'Введите значение' : undefined;
