export class ChatService {
  constructor() {
    let conversations = new Map();

    // Remove
    conversations['MAIN'] = {
      id: 'MAIN',
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
    conversations['2'] = {
      id: '2',
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

      this.sendMessage({
        type: 'chat_message',
        content: 'here i am bitches',
      });
    };

    this.websocket.onclose = eventMessage => {
      console.log(`WebSocket connection closed with code ${eventMessage.code}`);
      this.websocket = null;
    };

    this.websocket.onmessage = event => {
      const data = JSON.parse(event.data);
      this.handleReceivedMessage(data);
      console.log(this.conversations['MAIN']);
    };
  }

  disconnect() {
    if (this.websocket) {
      this.websocket.close(); // IGNORE WARNINGS IN DEV
      this.websocket = null;
    }
  }
  // ! CHANGE, Receivers should be an array, not put inside an array
  sendMessage(receivers, content) {
    if (this.websocket && this.websocket.readyState == WebSocket.OPEN) {
      const payload = {
        id: String(Math.floor(Math.random() * 1000000)),
        type: 'chat_message',
        sender: 'test',
        // ! CHANGE
        receivers: [receivers],
        content: content,
      };

      this.websocket.send(JSON.stringify(payload));
      console.log(`Sent content: ${JSON.stringify(content)}`);
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
}
