import { LANG } from 'constants';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { getFormValues } from 'shared/utils/getFormValues';
import { addBlurValidation } from 'shared/utils/validation/addBlurValidation';
import { required } from 'shared/utils/validation/rules';
import { validEmail } from 'shared/utils/validation/rules/validEmail';
import { validLogin } from 'shared/utils/validation/rules/validLogin';
import { validName } from 'shared/utils/validation/rules/validName';
import { validPassword } from 'shared/utils/validation/rules/validPassword';
import { validPhone } from 'shared/utils/validation/rules/validPhone';
import { validateField } from 'shared/utils/validation/validateField/validateField';
import { validateForm } from 'shared/utils/validation/validateForm';
import { model } from 'stores/index';

import signUpTemplate from './signUp.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';
import { getValidatePasswordRepeatCoincidesFn } from './utils/validatePasswordRepeatCoincides';

const SIGNUP_FORM_ID = 'signup-form';

class SignUp extends Component {
  constructor() {
    super();
  }
  render(): void {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    const wrapper = document.createElement('main');

    const fields = {
      email: {
        placeholder: texts.email,
        name: 'email',
        rules: [required, validEmail],
      },
      login: {
        placeholder: texts.login,
        name: 'login',
        rules: [required, validLogin],
      },
      first_name: {
        placeholder: texts.name,
        name: 'first_name',
        rules: [required, validName],
      },
      second_name: {
        placeholder: texts.surname,
        name: 'second_name',
        rules: [required, validName],
      },
      phone: {
        placeholder: texts.phone,
        name: 'phone',
        rules: [required, validPhone],
      },
      password: {
        placeholder: texts.password,
        name: 'password',
        rules: [required, validPassword],
      },
      passwordRepeat: {
        placeholder: texts.passwordRepeat,
        name: 'passwordRepeat',
        rules: [required, getValidatePasswordRepeatCoincidesFn(SIGNUP_FORM_ID)],
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

    wrapper.classList.add(styles.wrapper);
    wrapper.innerHTML = html;

    const form = wrapper.querySelector(`#${SIGNUP_FORM_ID}`);

    const submitHandler = (e: Event) => {
      e.preventDefault();
      if (!form) return;
      const errors = validateForm(form, Object.values(fields));
      if (Object.values(errors).length) return;
      console.log(getFormValues(SIGNUP_FORM_ID));
    };

    form?.addEventListener('submit', submitHandler);

    if (form) {
      Object.values(fields).forEach((field) => {
        addBlurValidation(field.name, field.rules, form);
      });

      const passwordField = form.querySelector('input[name="password"]');
      const passwordRepeatField = form.querySelector(
        'input[name="passwordRepeat"]'
      );

      passwordField?.addEventListener('blur', () => {
        if (
          passwordRepeatField &&
          'value' in passwordRepeatField &&
          passwordRepeatField.value
        ) {
          validateField(
            'passwordRepeat',
            [getValidatePasswordRepeatCoincidesFn(SIGNUP_FORM_ID)],
            form
          );
        }
      });
    }

    this.element = wrapper;
    super.render();
  }
}

export const signUp = new SignUp();
