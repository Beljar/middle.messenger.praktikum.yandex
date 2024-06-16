export const validName = (val: string) => {
  return /^[A-ZА-ЯЁ][A-Za-zа-яА-ЯЁё-]*$/.test(val)
    ? undefined
    : 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
};
