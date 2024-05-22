import { Router } from 'shared/components';
import { Component } from 'shared/components/Component';

import { changePassword } from './change-password';
import { profileEdit } from './profile-edit';
import { profileView } from './profile-view';

class Profile extends Component {
  constructor() {
    super();
  }
  render(): void {
    const router = new Router({
      view: profileView,
      edit: profileEdit,
      change_pass: changePassword,
    });

    const path = window.location.pathname
      .trim()
      .split('/')
      .reverse()
      .filter(Boolean);
    router.setParent(this.parent);
    const route = path.length < 2 ? 'view' : path[0];
    router.state = { route };
  }
}

export const profile = new Profile();
