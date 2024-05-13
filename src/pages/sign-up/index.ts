import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { addBlurValidation } from 'shared/utils/validation/addBlurValidation';
import { model } from 'stores/index';

import signUpTemplate from './signUp.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class SignUp extends Component {
  constructor() {
    super();
  }
  render(): void {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');

    const fields = {
      email: { placeholder: texts.email, name: 'email' },
      login: { placeholder: texts.login, name: 'login' },
      first_name: { placeholder: texts.name, name: 'first_name' },
      second_name: { placeholder: texts.surname, name: 'second_name' },
      phone: { placeholder: texts.phone, name: 'phone' },
      password: { placeholder: texts.password, name: 'password' },
      passwordRepeat: {
        placeholder: texts.passwordRepeat,
        name: 'passwordRepeat',
      },
    };

    const html = signUpTemplate({
      title: { text: capitalizeFirst(texts.registration) },
      ...fields,
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

    const rules = [(val) => (!val ? 'Введите значение' : undefined)];

    addBlurValidation('email', rules, form);

    this.element = wrapper;
    super.render();
  }
}

export const signUp = new SignUp();
