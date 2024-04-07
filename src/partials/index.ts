import Handlebars from "handlebars/runtime";

import avatar from "./avatar/avatar.hbs";
import button from "./button/button.hbs";
import input from "./input/input.hbs";
import h1 from "./typography/h1/h1.hbs";
import text from "./typography/text/text.hbs";
import link from "./link/link.hbs";

export const registerPartials = () => {
  Handlebars.registerPartial("avatar", avatar);
  Handlebars.registerPartial("button", button);
  Handlebars.registerPartial("input", input);
  Handlebars.registerPartial("h1", h1);
  Handlebars.registerPartial("text", text);
  Handlebars.registerPartial("link", link);
};
