import { LANG } from 'constants';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { locales } from 'stores/locales';

import stub500 from './stub500.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

export const Stub500 = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement('div');

  const html = stub500({
    title: { text: capitalizeFirst(texts.broken) },
    styles,
  });

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;

  return wrapper;
};
