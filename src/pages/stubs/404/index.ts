import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { model } from 'stores/index';

import stub404Template from './stub404.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class Stub404 extends Component {
  constructor() {
    super();
  }
  render(): void {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];

    this.html = stub404Template({
      title: { text: capitalizeFirst(texts.nothingHere) },
      styles,
    });

    super.render();
  }
}

export const stub404 = new Stub404();
