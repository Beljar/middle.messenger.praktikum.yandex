import { ChatListItemDTO, client } from 'shared/client';

export interface IChatList {
  isLoading: boolean;
  chatList: ChatListItemDTO[];
}

class ChatList {
  data: IChatList;
  constructor() {
    this.data = { isLoading: false, chatList: [] };
  }
  setIsLoading(isLoading: boolean) {
    this.data.isLoading = isLoading;
  }
  async fetchChatList() {
    const chats = await client.getChats();
    this.data.chatList = chats;
    this.setIsLoading(false);
  }
}

export const chatListModel = new ChatList();
