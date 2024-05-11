import { chatMock } from 'pages/chats/chat/mocks';

export const client = {
  getChatById: (chatId) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(chatMock);
      }, 1000);
    });
  },
};
