import { mock } from '../../mocks';

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
        res({
          id: chatId,
          messages:
            mock.chats.find((chat) => chat.id === chatId)?.messages || [],
        });
      }, Math.random() * 1000);
    });
  },
  getChats: (): Promise<ChatListItemDTO[]> => {
    return new Promise((res) => {
      setTimeout(() => {
        res(
          mock.chats.map((chat) => ({
            id: chat.id,
            author: chat.author,
            lastMessage: chat.messages[chat.messages.length - 1].message,
            date: chat.date,
            count: chat.count,
          }))
        );
      }, Math.random() * 1000);
    });
  },
  postMessage: (
    message: string,
    chatId: string
  ): Promise<MessageDTO | void> => {
    return new Promise((res) => {
      const chat = mock.chats.find((chat) => chat.id === chatId);
      if (!chat) return;
      const newMessage = {
        id: '',
        author: 'me',
        message,
        date: new Date().toISOString(),
      };
      chat.lastMessage = message;
      chat.messages = [...chat.messages, newMessage];
      setTimeout(() => {
        res(newMessage);
      }, Math.random() * 1000);
    });
  },
};
