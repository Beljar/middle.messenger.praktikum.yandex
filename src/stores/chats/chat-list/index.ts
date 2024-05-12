import { ChatListItemDTO } from 'shared/client';

export const chatList: { chats: ChatListItemDTO[]; isLoading: boolean } = {
  chats: [],
  isLoading: false,
};
