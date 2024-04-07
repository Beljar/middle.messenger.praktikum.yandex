import { locales } from "stores/locales";
import { capitalizeFirst } from "shared/utils/capitalize-first";
import { getFormValues } from "shared/utils/getFormValues";

import { TEXTS } from "./texts";
import signup from "./signUp.hbs";

import styles from "./styles.module.scss";

export const SignUp = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS["ru"];
  const wrapper = document.createElement("div");

  const html = signup({
    title: { text: capitalizeFirst(texts.registration) },
    emailField: { placeholder: texts.email, name: "email" },
    loginField: { placeholder: texts.login, name: "login" },
    nameField: { placeholder: texts.name, name: "first_name" },
    surnameField: { placeholder: texts.surname, name: "second_name" },
    phoneField: { placeholder: texts.phone, name: "phone" },
    passwordField: { placeholder: texts.password, name: "password" },
    passwordRepeatField: {
      placeholder: texts.passwordRepeat,
      name: "passwordRepeat",
    },
    button: {
      label: capitalizeFirst(texts.signUp),
      type: "submit",
      id: "signup-submit",
    },
    loginLink: { href: "/login", text: capitalizeFirst(texts.enter) },
  });

  const submitHandler = (e: Event) => {
    e.preventDefault();
    console.log(getFormValues("signup-form"));
  };

  wrapper.classList.add(styles.wrapper);
  wrapper.innerHTML = html;

  const form = wrapper.querySelector("#signup-form");
  form?.addEventListener("submit", submitHandler);

  return wrapper;
};
