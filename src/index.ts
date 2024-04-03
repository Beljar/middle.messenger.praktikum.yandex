import { registerPartials } from "./partials";
import "./styles/styles.scss";

import { Login } from "pages/login";
import { SignUp } from "pages/sign-up";

const ROOTS = {
  login: Login,
  signup: SignUp,
};
registerPartials();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");
  const path = window.location.pathname.trim().split("/").filter(Boolean);
  root?.appendChild(ROOTS[path[0]]?.() || ROOTS.login());
});
