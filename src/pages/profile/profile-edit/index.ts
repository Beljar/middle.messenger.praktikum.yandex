import { LANG } from 'constants/index';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { getFormValues } from 'shared/utils/getFormValues';
import { addBlurValidation } from 'shared/utils/validation/addBlurValidation';
import { required } from 'shared/utils/validation/rules';
import { validEmail } from 'shared/utils/validation/rules/validEmail';
import { validLogin } from 'shared/utils/validation/rules/validLogin';
import { validName } from 'shared/utils/validation/rules/validName';
import { validPhone } from 'shared/utils/validation/rules/validPhone';
import { validateForm } from 'shared/utils/validation/validateForm';
import { model } from 'stores/index';

import { profileMock } from '../mocks';
import profileEditTemplate from './profileEdit.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

const FORM_ID = 'profile_form';
const SUBMIT_BTN_ID = 'submit_button';
const RESET_BTN_ID = 'reset_button';

class ProfileEdit extends Component {
  render() {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];

    const fields = {
      displayField: {
        placeholder: texts.email,
        name: 'display_name',
        rules: [required, validName],
        value: profileMock.displayName,
      },
      emailField: {
        placeholder: texts.email,
        name: 'email',
        rules: [required, validEmail],
        value: profileMock.email,
      },
      loginField: {
        placeholder: texts.login,
        name: 'login',
        rules: [required, validLogin],
        value: profileMock.login,
      },
      nameField: {
        placeholder: texts.name,
        name: 'first_name',
        rules: [required, validName],
        value: profileMock.name,
      },
      surnameField: {
        placeholder: texts.surname,
        name: 'second_name',
        rules: [required, validName],
        value: profileMock.surname,
      },
      phoneField: {
        placeholder: texts.phone,
        name: 'phone',
        rules: [required, validPhone],
        value: profileMock.phone,
      },
    };

    this.html = profileEditTemplate({
      ...profileMock,
      avatar: { id: 'avatar' },
      ...fields,
      submitButton: { label: capitalizeFirst(texts.submit), id: SUBMIT_BTN_ID },
      cancelButton: {
        label: capitalizeFirst(texts.cancel),
        type: 'reset',
        id: RESET_BTN_ID,
      },
      styles,
    });

    super.render();

    const cancelButtonEl = document.querySelector(`#${RESET_BTN_ID}`);
    cancelButtonEl?.addEventListener('click', () => {
      location.href = '/profile';
    });

    const imgInput = document.querySelector('#avatar_input');
    const imgEl = document.querySelector('#avatar') as HTMLImageElement;
    imgInput?.addEventListener('change', (e: Event) => {
      const file = (e?.target as HTMLInputElement)?.files?.[0];
      const reader = new FileReader();
      if (!file || !imgEl) return;
      reader.readAsDataURL(file);
      reader.onload = function () {
        imgEl.src = String(reader.result);
      };
    });

    const form = document.querySelector(`#${FORM_ID}`);

    const submitHandler = (e: Event) => {
      e.preventDefault();
      if (!form) return;
      const errors = validateForm(form, Object.values(fields));
      if (Object.values(errors).length) return;
      console.log(getFormValues(FORM_ID));
    };

    form?.addEventListener('submit', submitHandler);

    if (form) {
      Object.values(fields).forEach((field) => {
        addBlurValidation(field.name, field.rules, form);
      });
    }
  }
}

export const profileEdit = new ProfileEdit();
