import { chat } from 'pages/chats/chat';
import { chatList } from 'pages/chats/chatList';

import { chatListModel, currentChatModel } from '..';

export const send = async (message: string) => {
  currentChatModel.setIsPosting(true);
  chat.state = { ...currentChatModel.data };
  await currentChatModel.postMessage(message);
  currentChatModel.setIsPosting(false);
  chat.state = { ...currentChatModel.data };
  const { chatList: chats } = chatListModel.data;
  const currentChat = chats.find(
    (chat) => chat.id === currentChatModel.data.id
  );
  if (!currentChat) return;
  currentChat.lastMessage = message;
  chatList.state = { ...chatListModel.data };
};
