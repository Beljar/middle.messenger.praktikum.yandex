import { LANG } from 'constants/index';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { locales } from 'stores/locales';

import { profileMock } from '../mocks';
import profileEdit from './profileEdit.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

const SUBMIT_BTN_ID = 'submit_button';
const RESET_BTN_ID = 'reset_button';

export const ProfileEdit = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement('main');
  const html = profileEdit({
    ...profileMock,
    avatar: { id: 'avatar' },
    displayField: { placeholder: texts.email, name: 'email' },
    emailField: { placeholder: texts.email, name: 'email' },
    loginField: { placeholder: texts.login, name: 'login' },
    nameField: { placeholder: texts.name, name: 'first_name' },
    surnameField: { placeholder: texts.surname, name: 'second_name' },
    phoneField: { placeholder: texts.phone, name: 'phone' },
    submitButton: { label: capitalizeFirst(texts.submit), id: SUBMIT_BTN_ID },
    cancelButton: {
      label: capitalizeFirst(texts.cancel),
      type: 'reset',
      id: RESET_BTN_ID,
    },
    styles,
  });
  wrapper.innerHTML = html;
  wrapper.classList.add(styles.wrapper);

  const cancelButtonEl = wrapper.querySelector(`#${RESET_BTN_ID}`);
  cancelButtonEl?.addEventListener('click', () => {
    location.href = '/profile';
  });

  const imgInput = wrapper.querySelector('#avatar_input');
  const imgEl = wrapper.querySelector('#avatar') as HTMLImageElement;
  imgInput?.addEventListener('change', (e: Event) => {
    const file = (e?.target as HTMLInputElement)?.files?.[0];
    const reader = new FileReader();
    if (!file || !imgEl) return;
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgEl.src = String(reader.result);
    };
  });

  return wrapper;
};
