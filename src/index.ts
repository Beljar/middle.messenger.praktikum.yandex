import "./styles/styles.scss";
import { registerPartials } from "./partials";

import { Login } from "pages/login";
import { SignUp } from "pages/sign-up";
import { Chats } from "pages/chats";
import { Profile } from "pages/profile";

const ROOTS = {
  login: Login,
  signup: SignUp,
  chats: Chats,
  profile: Profile,
};
registerPartials();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");
  const path = window.location.pathname
    .trim()
    .split("/")
    .filter(Boolean) as (keyof typeof ROOTS)[];
  root?.appendChild(ROOTS[path[0]]?.() || ROOTS.login());
  const element = document.querySelector(".chat");
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
});
