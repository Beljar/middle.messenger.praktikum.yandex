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
    this.html = chatListTemplate({
      chats: chatList.map((chat) => ({
        ...chat,
        date: formatDate(chat.date),
        isSelected: currentChatId === chat.id,
      })),
      isLoading: isLoading,
      styles,
    });
    super.render();
    //выбор чата
    const chatLiEls = document.querySelectorAll('li');
    chatLiEls.forEach((el) => {
      el.addEventListener('click', () => {
        eventBus.emit('chats:select', el.id);
      });
    });
  }
}

export const chatList = new ChatList();
