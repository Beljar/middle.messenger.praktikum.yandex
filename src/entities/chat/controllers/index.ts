import { Controller } from 'shared/utils/Controller';

import { mount } from './mount';
import { select } from './select';
import { send } from './send';

export const chatsController = new Controller('chats');

chatsController.setBinding('mount', mount);
chatsController.setBinding('send', send);
chatsController.setBinding('select', select);
