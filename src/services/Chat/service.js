import Account from './Account';
import { Message } from './messages';
export class ChatService {
  constructor() {
    const chats = new Map();
    const accounts = new Map();
    const serverUsers = new Map();

    this.url = null;
    this.websocket = null;
    this.token = null;
    this.chats = chats;
    this.accounts = accounts;
    this.users = serverUsers;
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

  initialize(initialData) {
    this.user = initialData.user;

    initialData.accounts.forEach(account => {
      this.accounts.set(account.ID, new Account(account));
    });

    initialData.users.forEach(user => {
      this.users[user.id] = user;
    });

    initialData.chats.forEach(chat => {
      this.chats[chat.id] = chat;
    });

    console.log(initialData);
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
          data: payload, // ?
        })
      );
      console.log('Sent content' + payload);
    }
  }

  // TODO: make mostly all getters and setters instead of useEffect weird shit
  getUsers() {
    return this.users;
  }

  getAccounts() {
    return this.accounts;
  }

  addAccount(account) {
    if (this.websocket && this.websocket.readyState == WebSocket.OPEN) {
      this.websocket.send(
        JSON.stringify({
          type: 'account_create',
          data: account, // ?
        })
      );
    }
  }

  handleReceivedMessage(payload) {
    const data = payload.data;

    switch (payload.type) {
      case 'chat_message':
        // this.chats.get(data.chatId).messages.push(new Message(data));
        this.chats.get(data.chatId).messages.push(data); // TODO: Remove this and use new ChatMessage()
        console.log(`received a chat message ${payload}`);
        break;

      case 'account_create':
        this.accounts.set(data.ID, new Account(data));
        console.log(`received a connection event ${payload}`);
        break;

      case 'initial':
        this.initialize(data);
        break;

      default:
        console.log(`Received unknown type: ${payload.type}`);
    }
  }
}
