import { LANG } from 'constants';

export const locales = {
  lang: LANG.RU as keyof typeof LANG,
  _cbs: [] as (() => void)[],
  set: function (lang: keyof typeof LANG) {
    this.lang = lang;
    this._cbs.forEach((cb: () => void) => {
      cb();
    });
  },
  get: function () {
    return this;
  },
  subscribe: function (cb: () => void) {
    this._cbs.push(cb);
  },
};
