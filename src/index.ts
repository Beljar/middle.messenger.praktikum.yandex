import "./styles/styles.scss";
import { registerPartials } from "./partials";

import { Login } from "pages/login";
import { SignUp } from "pages/sign-up";
import { Chats } from "pages/chats";
import { Profile } from "pages/profile";
import { Stub404 } from "pages/stubs/404";
import { Stub500 } from "pages/stubs/500";

const ROOTS = {
  login: Login,
  signup: SignUp,
  chats: Chats,
  profile: Profile,
  "404": Stub404,
  "500": Stub500,
};
registerPartials();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");
  const path = window.location.pathname
    .trim()
    .split("/")
    .filter(Boolean) as (keyof typeof ROOTS)[];
  const domain = path[0] || "login";
  root?.appendChild(ROOTS[domain]?.() || ROOTS["404"]());
  const element = document.querySelector(".chat");
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
});
