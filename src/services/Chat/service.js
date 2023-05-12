export class ChatService {
  constructor() {
    let conversations = new Map();

    // Remove
    conversations[1] = {
      id: 1,
      title: 'TestChat',
      type: 'channel_pub',
      users: ['Gino', 'Palle'],
      messages: [
        { id: '1', sender: 'shurizzle', content: 'Go' },
        { id: '2', sender: 'shurizzle', content: 'Fa' },
        { id: '3', sender: 'shurizzle', content: 'Cagare' },
      ],
    };

    // Remove
    conversations[2] = {
      id: 2,
      title: 'Test2',
      type: 'channel_pub',
      users: ['Gino', 'Palle'],
      messages: [
        { id: '1', sender: 'OU', content: 'ssss' },
        { id: '2', sender: 'O9OOOOOO', content: 'ffff' },
        { id: '3', sender: 'WWWWWWW', content: 'eeeeeeë' },
      ],
    };

    this.url = null;
    this.websocket = null;
    this.token = null;
    this.conversations = conversations;
    this.users = {};
    this.profile = {};
    this.settings = {};
  }
  connect(url) {
    this.url = url;
    this.websocket = new WebSocket(url);

    this.websocket.onopen = event => {
      console.log('websocket opened connection succesfully');
      console.log(event.target);

      // this.sendMessage({
      //   type: 'chat_message',
      //   content: 'here i am bitches',
      // });
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

  handleReceivedMessage(content) {
    switch (content.type) {
      case 'chat_message':
        this.conversations[content.receivers].messages.push(content);
        console.log('we received a connection event');
        console.log(content);
        break;
      case 'user_login':
        this.profile = content.data;
        console.log(`Got content: ${this.profile}`);

      default:
        console.log(`Received unknown type: ${content.type}`);
    }
    console.log(`Got content: ${JSON.stringify(content)}`);
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
}
