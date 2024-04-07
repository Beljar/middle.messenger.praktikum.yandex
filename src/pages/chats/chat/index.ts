import Handlebars from "handlebars/runtime";

import "./bubble/index";

import chat from "./chat.hbs";

import "./styles.scss";

Handlebars.registerPartial("chat", chat);
