import { chatList as chatListComponent } from 'pages/chats/chatList';

import { chatListModel, currentChatModel } from '..';
import { select } from './select';

export const mount = async () => {
  //setting loaders
  currentChatModel.setIsLoading(true);
  chatListModel.setIsLoading(true);
  chatListComponent.state = {
    ...chatListModel.data,
  };

  //fetching chatList
  await chatListModel.fetchChatList();
  chatListComponent.state = {
    ...chatListModel.data,
  };

  //fetching current chat
  const chatList = chatListModel.data.chatList;
  const lastChat = chatList[0];
  select(lastChat.id);
};
