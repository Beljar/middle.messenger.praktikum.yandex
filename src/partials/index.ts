import Handlebars from "handlebars/runtime";

import button from "./button/button.hbs";
import input from "./input/input.hbs";
import h1 from "./typography/h1/h1.hbs";
import link from "./link/link.hbs";

export const registerPartials = () => {
  Handlebars.registerPartial("button", button);
  Handlebars.registerPartial("input", input);
  Handlebars.registerPartial("h1", h1);
  Handlebars.registerPartial("link", link);
};
