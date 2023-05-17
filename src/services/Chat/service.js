export class ChatService {
  constructor() {
    const chats = new Map();
    this.url = null;
    this.websocket = null;
    this.token = null;
    this.chats = chats;
    this.users = null;
    this.user = null;
    this.settings = null;
  }
  connect(url) {
    this.url = url;
    this.websocket = new WebSocket(url);

    this.websocket.onopen = event => {
      console.log('websocket opened connection succesfully');
      console.log(event.target);
    };

    this.websocket.onclose = eventMessage => {
      console.log(`WebSocket connection closed with code ${eventMessage.code}`);
      this.websocket = null;
    };

    this.websocket.onmessage = event => {
      const data = JSON.parse(event.data);
      this.handleReceivedMessage(data);
    };
  }

  disconnect() {
    if (this.websocket) {
      this.websocket.close(); // IGNORE WARNINGS IN DEV
      this.websocket = null;
    }
  }

  sendMessage(payload) {
    if (this.websocket && this.websocket.readyState == WebSocket.OPEN) {
      this.websocket.send(
        JSON.stringify({
          type: 'chat_message',
          token: this.getToken(),
          data: payload, // ?
        })
      );
      console.log(`Sent content: ${payload}`);
    }
  }

  handleReceivedMessage(payload) {
    const data = payload.data;

    switch (payload.type) {
      case 'chat_message':
        this.chats[data.chatId].messages.push(data);
        console.log(`received a connection event ${payload}`);
        break;

      case 'initial':
        this.initialize(data);
        break;

      default:
        console.log(`Received unknown type: ${payload.type}`);
    }
  }

  getToken() {
    const tokenName = 'YWS';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(tokenName + '=')) {
        return cookie.substring(tokenName.length + 1);
      }
    }
    return null;
  }

  saveToken(token) {
    document.cookie = token;
  }

  initialize(initialData) {
    console.log('initializing');
    this.user = initialData.user;
    initialData.chats.forEach(chat => {
      this.chats[chat.id] = chat;
    });
    console.log(initialData);
  }
}
