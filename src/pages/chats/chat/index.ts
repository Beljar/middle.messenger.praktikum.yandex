import './bubble/index';
import './styles.scss';

import Handlebars from 'handlebars/runtime';

import chat from './chat.hbs';

Handlebars.registerPartial('chat', chat);
