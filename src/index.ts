import "./styles/styles.scss";
import { registerPartials } from "./partials";

import { Login } from "pages/login";
import { SignUp } from "pages/sign-up";
import { Chats } from "pages/chats";

const ROOTS = {
  login: Login,
  signup: SignUp,
  chats: Chats,
};
registerPartials();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");
  const path = window.location.pathname.trim().split("/").filter(Boolean);
  root?.appendChild(ROOTS[path[0]]?.() || ROOTS.login());
  const element = document.querySelector(".chat");
  element.scrollTop = element.scrollHeight;
  console.log(element.scrollHeight);
});
