import { MessageDTO } from 'shared/client';

import { chats } from './chats';
import { messages } from './messages';

const shuffleArray = <T>(arr: T[]) => {
  const size = arr.length;
  const newArr = [...arr];
  for (let i = 0; i < size; i++) {
    const newIndex = Math.floor(Math.random() * size);
    const value = newArr[i];
    newArr[i] = newArr[newIndex];
    newArr[newIndex] = value;
  }
  return newArr;
};

const getChatMessages = () => shuffleArray<MessageDTO>(messages);

const getChats = () => {
  return chats.map((chat) => ({ ...chat, messages: getChatMessages() }));
};

const chatsMock = getChats();

export const mock = {
  chats: chatsMock,
};
