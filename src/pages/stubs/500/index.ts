import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { model } from 'stores/index';

import stub500Template from './stub500.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class Stub500 extends Component {
  constructor() {
    super();
  }
  render(): void {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');

    const html = stub500Template({
      title: { text: capitalizeFirst(texts.broken) },
      styles,
    });

    wrapper.classList.add(styles.wrapper);
    wrapper.innerHTML = html;

    this.element = wrapper;
    super.render();
  }
}

export const stub500 = new Stub500();
