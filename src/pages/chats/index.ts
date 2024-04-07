import { locales } from "stores/locales";
import { formatDate } from "shared/utils/formatDate";
import { capitalizeFirst } from "shared/utils/capitalize-first";

import "./chatList/index";
import "./chat/index";
import "./sendPanel/index";
import "./profilePanel/index";

import chats from "./chats.hbs";

import "./styles.scss";
import { TEXTS } from "./texts";

import { chatListMock } from "./chatList/mocks";
import { chatMock } from "./chat/mocks";

export const Chats = () => {
  const lang = locales.get().lang;
  const texts = TEXTS[lang] || TEXTS["ru"];
  const wrapper = document.createElement("div");

  const html = chats({
    chatList: {
      chats: chatListMock.map((chat) => ({
        ...chat,
        date: formatDate(chat.date),
      })),
    },
    currentChat: {
      messages: chatMock.map((message) => ({
        ...message,
        my: message.author === "me",
      })),
    },
    sendPanel: {
      input: { placeholder: texts.enterMessage, name: "message" },
      button: {
        label: capitalizeFirst(texts.send),
        type: "submit",
        id: "message",
      },
    },
    profilePanel: {
      link: {
        href: "/profile",
        text: capitalizeFirst(texts.profile),
      },
    },
  });

  wrapper.classList.add("chats");
  wrapper.innerHTML = html;
  return wrapper;
};
