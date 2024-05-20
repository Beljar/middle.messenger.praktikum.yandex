import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { model } from 'stores/index';

import loginTemplate from './login.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class Login extends Component {
  constructor() {
    super();
  }
  render(): void {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];

    this.html = loginTemplate({
      title: { text: capitalizeFirst(texts.entrance) },
      nameField: { placeholder: texts.name, name: 'login' },
      passwordField: { placeholder: texts.password, name: 'password' },
      button: {
        label: capitalizeFirst(texts.enter),
        type: 'submit',
        id: 'login-submit',
      },
      signUpLink: { href: '/signup', text: capitalizeFirst(texts.signUp) },
      styles,
    });

    const submitHandler = (e: Event) => {
      e.preventDefault();
      window.location.href = '/chats';
    };

    super.render();

    const form = document.querySelector('#login-form');
    form?.addEventListener('submit', submitHandler);
  }
}

export const login = new Login();
