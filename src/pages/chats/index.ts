import './chatList/index';
import './chat/index';
import './sendPanel/index';
import './profilePanel/index';

import { LANG } from 'constants';
import { IChatList } from 'entities/chat/model/chat-list';
import { emptyChat, ICurrentChat } from 'entities/chat/model/current-chat';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { formatDate } from 'shared/utils/formatDate';
import { getFormValues } from 'shared/utils/getFormValues';
import { addBlurValidation } from 'shared/utils/validation/addBlurValidation';
import { required } from 'shared/utils/validation/rules';
import { validateForm } from 'shared/utils/validation/validateForm';
import { model } from 'stores/index';

import { eventBus } from '../../event-bus';
import chatsTemplate from './chats.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

const SEND_FORM_ID = 'send-message-form';

class Chats extends Component<{
  currentChat: ICurrentChat;
  chats: IChatList;
}> {
  constructor() {
    super();
    this._state = {
      currentChat: emptyChat,
      chats: { chatList: [], isLoading: false },
    };
  }
  render(): void {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');
    const { chats, currentChat } = this.state;
    const html = chatsTemplate({
      chatList: {
        chats: chats.chatList.map((chat) => ({
          ...chat,
          date: formatDate(chat.date),
          isSelected: currentChat.id === chat.id,
        })),
        isLoading: chats.isLoading,
      },
      currentChat: {
        messages: currentChat.messages.map((message) => ({
          ...message,
          my: message.author === 'me',
        })),
        isLoading: currentChat.isLoading,
      },
      sendPanel: {
        textarea: { placeholder: texts.enterMessage, name: 'message' },
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
      const sendFormEl = document.querySelector(`#${SEND_FORM_ID}`);
      if (sendFormEl) {
        sendFormEl?.addEventListener('submit', (e) => {
          e.preventDefault();
          const errors = validateForm(sendFormEl, [
            { name: 'message', rules: [required] },
          ]);
          if (Object.values(errors).length) return;
          const values = getFormValues<{ message: string }>(SEND_FORM_ID);
          console.log(values);
          eventBus.emit('chats:send', values.message);
        });
        addBlurValidation('message', [required], sendFormEl, 'textarea');
      }

      //выбор чата
      const chatLiEls = document.querySelectorAll('li.chat-card');
      chatLiEls.forEach((el) => {
        el.addEventListener('click', () => {
          eventBus.emit('chats:select', el.id);
        });
      });

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
