import { LANG } from 'constants';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { getFormValues } from 'shared/utils/getFormValues';
import { locales } from 'stores/locales';

import login from './login.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

export const Login = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement('main');

  const html = login({
    title: { text: capitalizeFirst(texts.entrance) },
    nameField: { placeholder: texts.name, name: 'login' },
    passwordField: { placeholder: texts.password, name: 'password' },
    button: {
      label: capitalizeFirst(texts.enter),
      type: 'submit',
      id: 'login-submit',
    },
    signUpLink: { href: '/signup', text: capitalizeFirst(texts.signUp) },
  });

  const submitHandler = (e: Event) => {
    e.preventDefault();
    console.log(getFormValues('login-form'));
    window.location.href = '/chats';
  };

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;

  const form = wrapper.querySelector('#login-form');
  form?.addEventListener('submit', submitHandler);

  return wrapper;
};
