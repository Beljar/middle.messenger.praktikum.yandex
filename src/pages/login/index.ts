import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { locales } from 'stores/locales';

import loginTemplate from './login.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class Login extends Component {
  constructor() {
    super();
  }
  render(): void {
    const lang = locales.get().lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');

    const html = loginTemplate({
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
      window.location.href = '/chats';
    };

    wrapper.classList.add(styles.wrapper);
    wrapper.innerHTML = html;

    const form = wrapper.querySelector('#login-form');
    form?.addEventListener('submit', submitHandler);

    this.element = wrapper;
    super.render();
  }
}

export const login = new Login();
