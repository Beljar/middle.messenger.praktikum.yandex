import './chatList/index';
import './chat/index';
import './sendPanel/index';
import './profilePanel/index';

import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { formatDate } from 'shared/utils/formatDate';
import { getFormValues } from 'shared/utils/getFormValues';
import { model } from 'stores/model';

import { eventBus } from '../../event-bus';
import chatsTemplate from './chats.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class Chats extends Component {
  constructor() {
    super();
    this._state = {
      currentChat: {
        messages: [],
        isLoading: false,
      },
    };
  }
  render(): void {
    const currentChat = model.chats.currentChat;
    const chatList = model.chats.chatList;
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');
    const html = chatsTemplate({
      chatList: {
        chats: chatList.chats.map((chat) => ({
          ...chat,
          date: formatDate(chat.date),
        })),
        isLoading: chatList.isLoading,
      },
      currentChat: {
        messages: currentChat.messages.map((message) => ({
          ...message,
          my: message.author === 'me',
        })),
        isLoading: currentChat.isLoading,
      },
      sendPanel: {
        input: { placeholder: texts.enterMessage, name: 'message' },
        button: {
          label: capitalizeFirst(texts.send),
          type: 'submit',
          id: 'message',
        },
      },
      profilePanel: {
        link: {
          href: '/profile',
          text: capitalizeFirst(texts.profile),
        },
      },
      styles,
    });

    //отматывает скролл вниз
    const observer = new MutationObserver(function () {
      const element = document.querySelector('.chat');

      if (element && document.contains(element)) {
        element.scrollTop = element.scrollHeight;
      }
      const sendFormEl = document.querySelector('#send-message-form');
      if (sendFormEl) {
        sendFormEl?.addEventListener('submit', (e) => {
          e.preventDefault();
          const message = getFormValues<{ message: string }>(
            'send-message-form'
          ).message;
          eventBus.emit('chats:send', message);
        });
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
  }
}

export const chats = new Chats();
