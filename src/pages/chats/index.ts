import './chatList/index';
import './chat/index';
import './sendPanel/index';
import './profilePanel/index';

import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { formatDate } from 'shared/utils/formatDate';
import { locales } from 'stores/locales';
import { model } from 'stores/model';

import { chatMock } from './chat/mocks';
import { chatListMock } from './chatList/mocks';
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
  mount() {
    this.state = {
      currentChat: {
        messages: chatMock,
        isLoading: false,
      },
    };
    this.render();
  }
  render(): void {
    const currentChat = model.currentChat;
    const lang = locales.get().lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');
    const html = chatsTemplate({
      chatList: {
        chats: chatListMock.map((chat) => ({
          ...chat,
          date: formatDate(chat.date),
        })),
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
