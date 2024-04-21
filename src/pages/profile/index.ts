import { ChangePassword } from './change-password';
import { ProfileEdit } from './profile-edit';
import { ProfileView } from './profile-view';

const ROUTES = {
  view: ProfileView,
  edit: ProfileEdit,
  change_pass: ChangePassword,
};

export const Profile = () => {
  const path = window.location.pathname
    .trim()
    .split('/')
    .reverse()
    .filter(Boolean) as (keyof typeof ROUTES)[];
  console.log(path);
  return ROUTES[path[0]]?.() || ROUTES.view();
};
