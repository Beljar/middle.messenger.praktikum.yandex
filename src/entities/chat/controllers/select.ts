import { chats } from 'pages/chats';

import { chatListModel, currentChatModel } from '..';

export const select = async (id: string) => {
  //setting loaders
  currentChatModel.setIsLoading(true);
  currentChatModel.setId(id);
  chats.state = {
    ...chats.state,
    currentChat: currentChatModel.data,
    chats: chatListModel.data,
  };

  //fetching current chat
  await currentChatModel.fetchCurrentChat(id);
  const chatList = chatListModel.data.chatList;
  const index = chatList.findIndex((chat) => chat.id === id);
  chatList[index] = { ...chatList[index], count: 0 };
  chats.state = {
    ...chats.state,
    chats: { ...chatListModel.data, chatList },
    currentChat: currentChatModel.data,
  };
};
