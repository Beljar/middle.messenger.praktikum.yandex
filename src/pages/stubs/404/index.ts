import { LANG } from 'constants';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { locales } from 'stores/locales';

import stub404 from './stub404.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

export const Stub404 = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement('main');

  const html = stub404({
    title: { text: capitalizeFirst(texts.nothingHere) },
    styles,
  });

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;

  return wrapper;
};
