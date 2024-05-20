import { LANG } from 'constants/index';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { model } from 'stores/index';

import sendPanelTemplate from './sendPanel.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class SendPanel extends Component {
  render() {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const html = sendPanelTemplate({
      textarea: { placeholder: texts.enterMessage, name: 'message' },
      button: {
        label: capitalizeFirst(texts.send),
        type: 'submit',
        id: 'message',
      },
      styles,
    });
    const wrapper = document.createElement('div');
    wrapper.classList.add(styles.wrapper);
    wrapper.innerHTML = html;
    this.element = wrapper;

    super.render();
  }
}

export const sendPanel = new SendPanel();
