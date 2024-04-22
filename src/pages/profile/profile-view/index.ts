import { LANG } from 'constants/index';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { locales } from 'stores/locales';

import { profileMock } from '../mocks';
import profileView from './profileView.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

export const ProfileView = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement('main');
  const html = profileView({
    ...profileMock,
    editButton: { label: capitalizeFirst(texts.edit), id: 'edit_button' },
    changePassword: {
      text: capitalizeFirst(texts.changePassword),
      href: '/profile/change_pass',
    },
    styles,
  });
  wrapper.innerHTML = html;
  wrapper.classList.add(styles.wrapper);
  const editButtonEl = wrapper.querySelector('#edit_button');
  editButtonEl?.addEventListener('click', () => {
    location.href = '/profile/edit';
  });
  return wrapper;
};
