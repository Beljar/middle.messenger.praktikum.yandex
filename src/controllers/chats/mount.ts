import { chats } from 'pages/chats';
import { client } from 'shared/client';
import { model } from 'stores/model';

export const mount = async () => {
  chats.render();
  model.chats.currentChat = {
    ...model.chats.currentChat,
    isLoading: true,
    messages: [],
  };
  model.chats.chatList = {
    isLoading: true,
    chats: [],
  };

  const chatList = await client.getChats();
  model.chats.chatList = {
    isLoading: false,
    chats: chatList,
  };
  chats.render();
  const lastChat = chatList[chatList.length - 1];
  const { messages } = await client.getChatById(lastChat.id);
  model.chats.currentChat = {
    ...model.chats.currentChat,
    isLoading: false,
    messages,
  };
  chats.render();
};
