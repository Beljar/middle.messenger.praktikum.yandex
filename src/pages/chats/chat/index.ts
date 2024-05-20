import './bubble/index';

import { getEmptyChat, ICurrentChat } from 'entities/chat/model/current-chat';
import { Component } from 'shared/components/Component';

import chatTemplate from './chat.hbs';
import styles from './styles.module.scss';

class Chat extends Component<ICurrentChat> {
  constructor() {
    super();
    this._state = getEmptyChat();
  }
  render(): void {
    const { messages, isLoading, isPosting } = this.state;
    this.html = chatTemplate({
      messages: messages.map((message) => ({
        ...message,
        my: message.author === 'me',
      })),
      isLoading,
      isPosting,
      styles,
    });

    super.render();

    //отматывает скролл вниз
    const element = document.querySelector('#current-chat>div');

    if (element && document.contains(element)) {
      element.scrollTop = element.scrollHeight;
    }
  }
}

export const chat = new Chat();
