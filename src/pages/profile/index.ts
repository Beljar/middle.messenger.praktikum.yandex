import { Component } from 'shared/utils/Component';

import { ChangePassword } from './change-password';
import { ProfileEdit } from './profile-edit';
import { ProfileView } from './profile-view';

const ROUTES = {
  view: ProfileView,
  edit: ProfileEdit,
  change_pass: ChangePassword,
};

class Profile extends Component {
  constructor() {
    super();
  }
  render(): void {
    const path = window.location.pathname
      .trim()
      .split('/')
      .reverse()
      .filter(Boolean) as (keyof typeof ROUTES)[];

    this.element = ROUTES[path[0]]?.() || ROUTES.view();
    super.render();
  }
}

export const profile = new Profile();
