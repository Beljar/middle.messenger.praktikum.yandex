export const locales = {
  lang: "ru",
  _cbs: [],
  set: function (lang) {
    this.lang = lang;
    this._cbs.forEach((cb) => {
      cb();
    });
  },
  get: function () {
    return this;
  },
  subscribe: function (cb) {
    this._cbs.push(cb);
  },
};
