import './styles/styles.scss';

import { chats } from 'pages/chats';
import { chatMock } from 'pages/chats/chat/mocks';
import { login } from 'pages/login';
import { profile } from 'pages/profile';
import { signUp } from 'pages/sign-up';
import { stub404 } from 'pages/stubs/404';
import { stub500 } from 'pages/stubs/500';
import { client } from 'shared/client';
import { Router } from 'shared/components';
import { model } from 'stores/model';

import { documentController } from './controllers';
import { eventBus } from './event-bus';
import { registerPartials } from './partials';

registerPartials();
documentController.init(eventBus);

document.addEventListener('DOMContentLoaded', () => {
  eventBus.emit('document:load');
  console.log(eventBus);
  const router = new Router({
    login,
    signup: signUp,
    chats,
    profile,
    '404': stub404,
    '500': stub500,
  });
  const root = document.querySelector('#app');
  if (!root) return;
  router.setParent(root);

  const path = window.location.pathname
    .trim()
    .split('/')
    .filter(Boolean) as (keyof typeof ROOTS)[];
  const route = path[0] || 'login';
  router.state = { route };
});
