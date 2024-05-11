class Model {
  constructor() {
    this.currentChat = {
      messages: [],
      isLoading: false,
    };
  }
  setCurrentChat(currentChat) {
    this.currentChat = currentChat;
  }
}

export const model = new Model();
