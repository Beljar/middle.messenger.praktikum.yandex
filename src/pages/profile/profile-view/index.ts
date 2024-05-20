import { LANG } from 'constants/index';
import { Component } from 'shared/components/Component';
import { capitalizeFirst } from 'shared/utils/capitalize-first';
import { model } from 'stores/index';

import { profileMock } from '../mocks';
import profileViewTemplate from './profileView.hbs';
import styles from './styles.module.scss';
import { TEXTS } from './texts';

class ProfileView extends Component {
  render() {
    const lang = model.locales.lang;
    const texts = TEXTS[lang] || TEXTS[LANG.RU];
    this.html = profileViewTemplate({
      ...profileMock,
      editButton: { label: capitalizeFirst(texts.edit), id: 'edit_button' },
      changePassword: {
        text: capitalizeFirst(texts.changePassword),
        href: '/profile/change_pass',
      },
      styles,
    });
    const editButtonEl = document.querySelector('#edit_button');
    editButtonEl?.addEventListener('click', () => {
      location.href = '/profile/edit';
    });
    super.render();
  }
}

export const profileView = new ProfileView();
