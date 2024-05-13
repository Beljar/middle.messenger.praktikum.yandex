import { chats } from 'pages/chats';

import { chatListModel, currentChatModel } from '..';

export const mount = async () => {
  //setting loaders
  currentChatModel.setIsLoading(true);
  chatListModel.setIsLoading(true);
  chats.state = {
    ...chats.state,
    currentChat: currentChatModel.data,
    chats: chatListModel.data,
  };

  //fetching chatList
  await chatListModel.fetchChatList();
  chats.state = { ...chats.state, chats: chatListModel.data };

  //fetching current chat
  const chatList = chatListModel.data.chatList;
  const lastChat = chatList[chatList.length - 1];
  await currentChatModel.fetchCurrentChat(lastChat.id);
  chats.state = { ...chats.state, currentChat: currentChatModel.data };
};
