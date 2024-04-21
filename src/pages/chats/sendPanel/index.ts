import './style.scss';

import Handlebars from 'handlebars/runtime';

import sendPanel from './sendPanel.hbs';

Handlebars.registerPartial('sendPanel', sendPanel);
