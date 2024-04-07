import { locales } from "stores/locales";
import { capitalizeFirst } from "shared/utils/capitalize-first";
import { getFormValues } from "shared/utils/getFormValues";

import { TEXTS } from "./texts";
import login from "./login.hbs";

import styles from "./styles.module.scss";

export const Login = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS["ru"];
  const wrapper = document.createElement("div");

  const html = login({
    title: { text: capitalizeFirst(texts.entrance) },
    nameField: { placeholder: texts.name, name: "login" },
    passwordField: { placeholder: texts.password, name: "password" },
    button: {
      label: capitalizeFirst(texts.enter),
      type: "submit",
      id: "login-submit",
    },
    signUpLink: { href: "/signup", text: capitalizeFirst(texts.signUp) },
  });

  const submitHandler = (e: Event) => {
    e.preventDefault();
    console.log(getFormValues("login-form"));
    window.location = "/chats";
  };

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;

  const form = wrapper.querySelector("#login-form");
  form?.addEventListener("submit", submitHandler);

  return wrapper;
};
