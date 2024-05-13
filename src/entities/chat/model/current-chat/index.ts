import { ChatDetailDTO, client } from 'shared/client';

export interface ICurrentChat extends ChatDetailDTO {
  isLoading: boolean;
}

export const emptyChat: ICurrentChat = {
  id: '',
  messages: [],
  isLoading: false,
};

class CurrentChat {
  data: ICurrentChat;
  constructor() {
    this.data = emptyChat;
  }
  setIsLoading(isLoading: boolean) {
    this.data.isLoading = isLoading;
  }
  async fetchCurrentChat(id: string) {
    const { messages } = await client.getChatById(id);
    this.data.messages = messages;
    this.setIsLoading(false);
  }
  async postMessage(message: string) {
    const messages = [
      ...this.data.messages,
      {
        id: `message-${Math.random()}`,
        author: 'me',
        message,
        date: '2023-05-26T13:43:35Z',
      },
    ];
    this.data = {
      ...this.data,
      isLoading: false,
      messages,
    };
  }
}

export const currentChatModel = new CurrentChat();
