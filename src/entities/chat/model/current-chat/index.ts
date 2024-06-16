import { ChatDetailDTO } from 'shared/client';
import { HTTPTransportProxy } from 'shared/client/HTTPTransport/HTTPTransport';

export interface ICurrentChat extends ChatDetailDTO {
  isLoading: boolean;
  isPosting: boolean;
}

export const getEmptyChat = (): ICurrentChat => ({
  id: '',
  messages: [],
  isLoading: false,
  isPosting: false,
});

class CurrentChat {
  data: ICurrentChat;
  constructor() {
    this.data = getEmptyChat();
  }
  setIsPosting(isPosting: boolean) {
    this.data.isPosting = isPosting;
  }
  setIsLoading(isLoading: boolean) {
    this.data.isLoading = isLoading;
  }
  setId(id: string) {
    this.data.id = id;
  }
  async fetchCurrentChat(id: string) {
    const {
      response: { messages },
    } = await HTTPTransportProxy.get(`/chats/${id}`);
    this.data.messages = messages;
    this.data.id = id;
    this.setIsLoading(false);
  }
  async postMessage(message: string) {
    const { response: newMessage } = await HTTPTransportProxy.post(
      `/chats/${this.data.id}`,
      {
        data: {
          message,
        },
      }
    );

    if (!newMessage) return;
    const messages = [...this.data.messages, newMessage];
    this.data = {
      ...this.data,
      isLoading: false,
      messages,
    };
  }
}

export const currentChatModel = new CurrentChat();
