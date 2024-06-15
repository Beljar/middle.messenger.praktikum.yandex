const allowedChars = '[A-Za-z0-9_-]';

export const validLogin = (val: string) => {
  const re = new RegExp(
    `(?:(?=^${allowedChars}*[A-Za-z_-]${allowedChars}*$))(?:(?=${allowedChars}{3,10}))`
  );
  return re.test(val)
    ? undefined
    : ' от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)';
};
