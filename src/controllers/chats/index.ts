import { Controller } from 'shared/utils/Controller';

import { mount } from './mount';

export const chatsController = new Controller('chats');

chatsController.setBinding('mount', mount);
