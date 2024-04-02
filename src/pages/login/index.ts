import button from "partials/button/button.hbs";
import input from "partials/input/input.hbs";
import h1 from "partials/typography/h1/h1.hbs";
import { locales } from "stores/locales";
import { TEXTS } from "./texts";
import { capitalizeFirst } from "shared/utils/capitalize-first";

export const Login = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS["ru"];
  const title = h1({ text: capitalizeFirst(texts.enter) });
  const name_input = input({ placeholder: texts.name });
  const submit_button = button({ label: capitalizeFirst(texts.enter) });
  const wrapper = document.createElement("div");
  wrapper.classList.add("form");
  wrapper.innerHTML = `${title}${name_input}${submit_button}`;
  return wrapper;
};
