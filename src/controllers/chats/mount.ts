import { chats } from 'pages/chats';
import { client } from 'shared/client';
import { model } from 'stores/model';

export const mount = async () => {
  chats.render();
  model.setCurrentChat({
    isLoading: true,
    messages: [],
  });
  model.setChatList({
    isLoading: true,
    chats: [],
  });

  const chatList = await client.getChats();
  model.setChatList({
    isLoading: false,
    chats: chatList,
  });
  chats.render();
  const lastChat = chatList[chatList.length - 1];
  const messages = await client.getChatById(lastChat.id);
  model.setCurrentChat({
    isLoading: false,
    messages,
  });
  chats.render();
};
