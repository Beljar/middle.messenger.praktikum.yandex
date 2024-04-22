import { LANG } from 'constants';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { locales } from 'stores/locales';

import signup from './signUp.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

export const SignUp = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement('main');

  const html = signup({
    title: { text: capitalizeFirst(texts.registration) },
    emailField: { placeholder: texts.email, name: 'email' },
    loginField: { placeholder: texts.login, name: 'login' },
    nameField: { placeholder: texts.name, name: 'first_name' },
    surnameField: { placeholder: texts.surname, name: 'second_name' },
    phoneField: { placeholder: texts.phone, name: 'phone' },
    passwordField: { placeholder: texts.password, name: 'password' },
    passwordRepeatField: {
      placeholder: texts.passwordRepeat,
      name: 'passwordRepeat',
    },
    button: {
      label: capitalizeFirst(texts.signUp),
      type: 'submit',
      id: 'signup-submit',
    },
    loginLink: { href: '/login', text: capitalizeFirst(texts.enter) },
  });

  const submitHandler = (e: Event) => {
    e.preventDefault();
  };

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;

  const form = wrapper.querySelector('#signup-form');
  form?.addEventListener('submit', submitHandler);

  return wrapper;
};
