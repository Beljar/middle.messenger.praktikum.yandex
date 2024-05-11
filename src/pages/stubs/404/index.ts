import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { locales } from 'stores/locales';

import stub404Template from './stub404.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class Stub404 extends Component {
  constructor() {
    super();
  }
  render(): void {
    const lang = locales.get().lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');

    const html = stub404Template({
      title: { text: capitalizeFirst(texts.nothingHere) },
      styles,
    });

    wrapper.classList.add(styles.wrapper);
    wrapper.innerHTML = html;

    this.element = wrapper;
    super.render();
  }
}

export const stub404 = new Stub404();
