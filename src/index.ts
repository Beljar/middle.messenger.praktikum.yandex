import './styles/styles.scss';

import { chats } from 'pages/chats';
import { login } from 'pages/login';
import { profile } from 'pages/profile';
import { signUp } from 'pages/sign-up';
import { stub404 } from 'pages/stubs/404';
import { stub500 } from 'pages/stubs/500';

import { registerPartials } from './partials';

registerPartials();

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  if (!root) return;
  signUp.setParent(root);
  login.setParent(root);
  chats.setParent(root);
  profile.setParent(root);
  stub404.setParent(root);
  stub500.setParent(root);
  const ROOTS = {
    login: () => {
      login.render();
    },
    signup: () => {
      signUp.render();
    },
    chats: () => {
      chats.render();
    },
    profile: () => {
      profile.render();
    },
    '404': () => {
      stub404.render();
    },
    '500': () => {
      stub500.render();
    },
  };

  const path = window.location.pathname
    .trim()
    .split('/')
    .filter(Boolean) as (keyof typeof ROOTS)[];
  const domain = path[0] || 'login';

  domain in ROOTS ? ROOTS[domain]() : ROOTS['404']();
});
