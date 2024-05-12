import { chatMock } from 'pages/chats/chat/mocks';
import { chatListMock } from 'pages/chats/chatList/mocks';

export type MessageDTO = {
  id: string;
  author: string;
  message: string;
  date: string;
};

export type ChatDetailDTO = {
  id: string;
  messages: MessageDTO[];
};

export type ChatListItemDTO = {
  id: string;
  author: string;
  lastMessage: string;
  date: string;
  count: number | null;
};

export const client = {
  getChatById: (chatId: string): Promise<ChatDetailDTO> => {
    return new Promise((res) => {
      setTimeout(() => {
        res({ id: chatId, messages: chatMock });
      }, Math.random() * 1000);
    });
  },
  getChats: (): Promise<ChatListItemDTO[]> => {
    return new Promise((res) => {
      setTimeout(() => {
        res(chatListMock);
      }, Math.random() * 1000);
    });
  },
};
