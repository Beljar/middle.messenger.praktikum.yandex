import Handlebars from "handlebars/runtime";

import chatList from "./chatList.hbs";

import "./styles.scss";

Handlebars.registerPartial("chatList", chatList);
