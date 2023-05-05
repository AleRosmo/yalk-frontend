export class ChatService {
  constructor() {
    let conversations = new Map();

    // Remove
    conversations['MAIN'] = {
      title: 'TestChat',
      name: 'name',
      type: 'channel_pub',
      users: ['Gino', 'Palle'],
      messages: [
        { id: '1', sender: 'shurizzle', message: 'Go' },
        { id: '2', sender: 'shurizzle', message: 'Fa' },
        { id: '3', sender: 'shurizzle', message: 'Cagare' },
      ],
    };

    // Remove
    conversations['2'] = {
      title: 'Test2',
      name: 'name',
      type: 'channel_pub',
      users: ['Gino', 'Palle'],
      messages: [
        { id: '1', sender: 'OU', message: 'ssss' },
        { id: '2', sender: 'O9OOOOOO', message: 'ffff' },
        { id: '3', sender: 'WWWWWWW', message: 'eeeeeeë' },
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
        type: 'channel_message',
        message: 'here i am bitches',
      });
    };

    this.websocket.onclose = eventMessage => {
      console.log(`WebSocket connection closed with code ${eventMessage.code}`);
      this.websocket = null;
    };

    this.websocket.onmessage = event => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
      console.log(this.conversations['MAIN']);
    };
  }

  disconnect() {
    if (this.websocket) {
      this.websocket.close(); // IGNORE WARNINGS IN DEV
      this.websocket = null;
    }
  }

  sendMessage(message) {
    if (this.websocket && this.websocket.readyState == WebSocket.OPEN) {
      const payload = {
        // ! CHANGE
        id: String(Math.floor(Math.random() * 1000000)),
        type: 'channel_message',
        sender: 'test',
        receiver: 'MAIN',
        message: message,
      };

      this.websocket.send(JSON.stringify(payload));
      console.log(`Sent message: ${JSON.stringify(message)}`);
    }
  }

  handleMessage(message) {
    switch (message.type) {
      case 'channel_message':
        this.conversations['MAIN'].messages.push(message);
        console.log('we received a connection event');
        console.log(message);
        break;
      default:
        console.log(`Received unknown type: ${message.type}`);
    }
    console.log(`Got message: ${JSON.stringify(message)}`);
  }
}
