import { Controller } from 'shared/utils/Controller';

import { eventBus } from '../event-bus';
import { chatsController } from './chats';

export { chatsController } from './chats';

export const documentController = new Controller('document');

documentController.setBinding('load', () => {
  console.log('load');
  chatsController.init(eventBus);
});
