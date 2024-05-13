import { LANG } from 'constants';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { model } from 'stores/index';

import changePassword from './changePassword.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

export const ChangePassword = () => {
  const lang = model.locales.lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement('main');

  const html = changePassword({
    title: { text: capitalizeFirst(texts.changePassword) },
    passwordField: { placeholder: texts.password, name: 'password' },
    passwordRepeatField: { placeholder: texts.passwordRepeat },
    button: {
      label: capitalizeFirst(texts.submit),
      type: 'submit',
      id: 'login-submit',
    },
    backLink: { href: '/profile', text: capitalizeFirst(texts.back) },
  });

  const submitHandler = (e: Event) => {
    e.preventDefault();
    window.location.href = '/chats';
  };

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;

  const form = wrapper.querySelector('#login-form');
  form?.addEventListener('submit', submitHandler);

  return wrapper;
};
