import { ChatListItemDTO, client } from 'shared/client';
import { HTTPTransportProxy } from 'shared/client/HTTPTransport/HTTPTransport';

export interface IChatList {
  isLoading: boolean;
  chatList: ChatListItemDTO[];
  currentChatId: string;
}

class ChatList {
  data: IChatList;
  constructor() {
    this.data = { isLoading: false, chatList: [], currentChatId: '' };
  }
  setIsLoading(isLoading: boolean) {
    this.data.isLoading = isLoading;
  }
  setCurrentChatId(currentChatId: string) {
    this.data.currentChatId = currentChatId;
  }
  async fetchChatList() {
    //const chats = await client.getChats();
    const { response: chats } = await HTTPTransportProxy.get('/chats', {
      method: 'get',
    });
    this.data.chatList = chats;
    this.setIsLoading(false);
  }
}

export const chatListModel = new ChatList();
