import { ChatDetailDTO } from 'shared/client';

export const currentChat: ChatDetailDTO & { isLoading: boolean } = {
  id: '',
  messages: [],
  isLoading: false,
};
