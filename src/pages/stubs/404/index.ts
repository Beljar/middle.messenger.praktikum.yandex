import { locales } from "stores/locales";
import { capitalizeFirst } from "shared/utils/capitalize-first";

import { TEXTS } from "./texts";
import stub404 from "./stub404.hbs";

import styles from "./styles.module.scss";
import { LANG } from "constants";

export const Stub404 = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement("div");

  const html = stub404({
    title: { text: capitalizeFirst(texts.nothingHere) },
    styles,
  });

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;

  return wrapper;
};
