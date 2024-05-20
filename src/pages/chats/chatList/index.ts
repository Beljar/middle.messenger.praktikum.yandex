import { IChatList } from 'entities/chat/model/chat-list';
import { Component } from 'shared/components/Component';
import { formatDate } from 'shared/utils/formatDate';

import { eventBus } from '../../../event-bus';
import chatListTemplate from './chatList.hbs';
import styles from './styles.module.scss';

class ChatList extends Component<IChatList> {
  constructor() {
    super();
    this._state = { chatList: [], isLoading: false, currentChatId: '' };
  }
  render(): void {
    const { chatList, isLoading, currentChatId } = this.state;
    const html = chatListTemplate({
      chats: chatList.map((chat) => ({
        ...chat,
        date: formatDate(chat.date),
        isSelected: currentChatId === chat.id,
      })),
      isLoading: isLoading,
      styles,
    });
    const wrapper = document.createElement('div');
    wrapper.classList.add(styles.wrapper);
    wrapper.innerHTML = html;
    this.element = wrapper;

    //выбор чата
    const chatLiEls = wrapper.querySelectorAll('li');
    chatLiEls.forEach((el) => {
      el.addEventListener('click', () => {
        eventBus.emit('chats:select', el.id);
      });
    });

    super.render();
  }
}

export const chatList = new ChatList();
