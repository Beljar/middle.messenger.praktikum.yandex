import { chatMock } from 'pages/chats/chat/mocks';
import { chatListMock } from 'pages/chats/chatList/mocks';

export const client = {
  getChatById: (chatId) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(chatMock);
      }, Math.random() * 1000);
    });
  },
  getChats: () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(chatListMock);
      }, Math.random() * 1000);
    });
  },
};
