const allowedChars = 'A-Za-z0-9-';
const allowedSpecials = "_!#$%&'*+/=?^_`{}|~";

export const validEmail = (val: string) => {
  const re = new RegExp(
    // eslint-disable-next-line no-useless-escape
    `^([${allowedChars}${allowedSpecials}]+\.?)*[${allowedChars}${allowedSpecials}]@([${allowedChars}]*\.)+[A-Za-z]{2,}$`
  );
  return re.test(val) ? undefined : 'невалидный email';
};
