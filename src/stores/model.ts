class Model {
  constructor() {
    this.currentChat = {
      messages: [],
      isLoading: false,
    };
    this.chatList = {
      chats: [],
      isLoading: false,
    };
  }
  setCurrentChat(currentChat) {
    this.currentChat = currentChat;
  }
  setChatList(chatList) {
    this.chatList = chatList;
  }
}

export const model = new Model();
