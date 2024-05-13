import { chats } from 'pages/chats';

import { chatListModel, currentChatModel } from '..';
import { select } from './select';

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
  const lastChat = chatList[0];
  select(lastChat.id);
};
