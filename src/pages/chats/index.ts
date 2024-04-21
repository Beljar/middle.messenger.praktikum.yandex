import './chatList/index';
import './chat/index';
import './sendPanel/index';
import './profilePanel/index';

import { LANG } from 'constants';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { formatDate } from 'shared/utils/formatDate';
import { locales } from 'stores/locales';

import { chatMock } from './chat/mocks';
import { chatListMock } from './chatList/mocks';
import chats from './chats.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

export const Chats = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement('main');

  const html = chats({
    chatList: {
      chats: chatListMock.map((chat) => ({
        ...chat,
        date: formatDate(chat.date),
      })),
    },
    currentChat: {
      messages: chatMock.map((message) => ({
        ...message,
        my: message.author === 'me',
      })),
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

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;
  return wrapper;
};
