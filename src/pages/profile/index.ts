import { Router } from 'shared/components';
import { Component } from 'shared/components/Component';

import { ChangePassword } from './change-password';
import { ProfileEdit } from './profile-edit';
import { profileView } from './profile-view';

const ROUTES = {
  view: profileView,
  edit: profileView,
  change_pass: profileView,
};

class Profile extends Component {
  constructor() {
    super();
  }
  render(): void {
    const router = new Router({
      view: profileView,
      edit: profileView,
      change_pass: profileView,
    });

    const path = window.location.pathname
      .trim()
      .split('/')
      .reverse()
      .filter(Boolean) as (keyof typeof ROUTES)[];
    router.setParent(this.parent);
    const route = path.length < 2 ? 'view' : path[0];
    router.state = { route };
  }
}

export const profile = new Profile();
