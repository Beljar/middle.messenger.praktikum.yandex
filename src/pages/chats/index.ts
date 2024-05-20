import './chatList/index';
import './chat/index';
import './sendPanel/index';
import './profilePanel/index';

import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { getFormValues } from 'shared/utils/getFormValues';
import { addBlurValidation } from 'shared/utils/validation/addBlurValidation';
import { required } from 'shared/utils/validation/rules';
import { validateForm } from 'shared/utils/validation/validateForm';
import { model } from 'stores/index';

import { eventBus } from '../../event-bus';
import { chat } from './chat/index';
import { chatList } from './chatList/index';
import chatsTemplate from './chats.hbs';
import { sendPanel } from './sendPanel/index';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

const SEND_FORM_ID = 'send-message-form';

class Chats extends Component {
  render(): void {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');
    const html = chatsTemplate({
      profilePanel: {
        link: {
          href: '/profile',
          text: capitalizeFirst(texts.profile),
        },
      },
      styles,
    });

    const observer = new MutationObserver(function () {
      const sendFormEl = document.querySelector(`#${SEND_FORM_ID}`);
      if (sendFormEl) {
        sendFormEl?.addEventListener('submit', (e) => {
          e.preventDefault();
          const errors = validateForm(sendFormEl, [
            { name: 'message', rules: [required], type: 'textarea' },
          ]);
          if (Object.values(errors).length) return;
          const values = getFormValues<{ message: string }>(SEND_FORM_ID);
          console.log(values);
          eventBus.emit('chats:send', values.message);
          const messageField = sendFormEl.querySelector('[name="message"');
          if (messageField && 'value' in messageField) {
            messageField.value = '';
          }
        });
        addBlurValidation('message', [required], sendFormEl, 'textarea');
      }

      observer.disconnect();
    });

    observer.observe(wrapper, {
      childList: true,
    });

    wrapper.classList.add(styles.wrapper);
    wrapper.innerHTML = html;
    this.element = wrapper;

    super.render();

    chat.parent = wrapper.querySelector('#current-chat') || undefined;
    chat.render();

    chatList.parent = wrapper.querySelector('#chat-list') || undefined;
    chatList.render();

    sendPanel.parent = wrapper.querySelector('#send-panel') || undefined;
    sendPanel.render();
  }
}

export const chats = new Chats();
