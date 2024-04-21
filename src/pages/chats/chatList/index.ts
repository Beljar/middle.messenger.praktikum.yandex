import './styles.scss';

import Handlebars from 'handlebars/runtime';

import chatList from './chatList.hbs';

Handlebars.registerPartial('chatList', chatList);
