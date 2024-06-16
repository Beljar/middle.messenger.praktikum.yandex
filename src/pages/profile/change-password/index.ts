import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { model } from 'stores/index';

import changePasswordTemplate from './changePassword.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class ChangePassword extends Component {
  render() {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');

    this.html = changePasswordTemplate({
      title: { text: capitalizeFirst(texts.changePassword) },
      passwordField: { placeholder: texts.password, name: 'password' },
      passwordRepeatField: { placeholder: texts.passwordRepeat },
      button: {
        label: capitalizeFirst(texts.submit),
        type: 'submit',
        id: 'login-submit',
      },
      backLink: { href: '/profile', text: capitalizeFirst(texts.back) },
      styles,
    });

    super.render();

    const submitHandler = (e: Event) => {
      e.preventDefault();
      window.location.href = '/chats';
    };

    const form = wrapper.querySelector('#login-form');
    form?.addEventListener('submit', submitHandler);
  }
}

export const changePassword = new ChangePassword();
