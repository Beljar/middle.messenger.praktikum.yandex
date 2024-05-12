import { chats } from 'pages/chats';
import { model } from 'stores/model';

export const send = async (message: string) => {
  const messages = [
    ...model.chats.currentChat.messages,
    {
      id: `message-${Math.random()}`,
      author: 'me',
      message,
      date: '2023-05-26T13:43:35Z',
    },
  ];
  model.chats.currentChat = {
    ...model.chats.currentChat,
    isLoading: false,
    messages,
  };
  chats.render();
};
