import { locales } from "stores/locales";
import { capitalizeFirst } from "shared/utils/capitalize-first";
import { getFormValues } from "shared/utils/getFormValues";

import { TEXTS } from "./texts";
import changePassword from "./changePassword.hbs";

import styles from "./styles.module.scss";
import { LANG } from "constants";

export const ChangePassword = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS[LANG.RU];
  const wrapper = document.createElement("div");

  const html = changePassword({
    title: { text: capitalizeFirst(texts.changePassword) },
    passwordField: { placeholder: texts.password, name: "password" },
    passwordRepeatField: { placeholder: texts.passwordRepeat },
    button: {
      label: capitalizeFirst(texts.submit),
      type: "submit",
      id: "login-submit",
    },
    backLink: { href: "/profile", text: capitalizeFirst(texts.back) },
  });

  const submitHandler = (e: Event) => {
    e.preventDefault();
    console.log(getFormValues("login-form"));
    window.location.href = "/chats";
  };

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;

  const form = wrapper.querySelector("#login-form");
  form?.addEventListener("submit", submitHandler);

  return wrapper;
};
