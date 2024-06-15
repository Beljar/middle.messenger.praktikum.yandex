import { chats } from 'pages/chats';
import { chat } from 'pages/chats/chat';
import { chatList as chatListComponent } from 'pages/chats/chatList';

import { chatListModel, currentChatModel } from '..';

export const select = async (id: string) => {
  //setting loaders
  currentChatModel.setIsLoading(true);
  currentChatModel.setId(id);
  chatListModel.setCurrentChatId(id);
  chatListComponent.state = {
    ...chatListComponent.state,
    ...chatListModel.data,
  };
  chat.state = { ...currentChatModel.data };

  //fetching current chat
  await currentChatModel.fetchCurrentChat(id);
  const chatList = chatListModel.data.chatList;
  const index = chatList.findIndex((chat) => chat.id === id);
  chatList[index] = { ...chatList[index], count: 0 };
  chat.state = { ...currentChatModel.data };
  chats.state = {
    ...chats.state,
    chats: { ...chatListModel.data, chatList },
    currentChat: currentChatModel.data,
  };
};
