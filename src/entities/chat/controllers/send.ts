import { chats } from 'pages/chats';

import { currentChatModel } from '..';

export const send = async (message: string) => {
  await currentChatModel.postMessage(message);
  chats.state = { ...chats.state, currentChat: currentChatModel.data };
};
