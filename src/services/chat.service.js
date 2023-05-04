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
        { id: '1', username: 'shurizzle', text: 'Go' },
        { id: '2', username: 'shurizzle', text: 'Fa' },
        { id: '3', username: 'shurizzle', text: 'Cagare' },
      ],
    };

    // Remove
    conversations['2'] = {
      title: 'Test2',
      name: 'name',
      type: 'channel_pub',
      users: ['Gino', 'Palle'],
      messages: [
        { id: '1', username: 'OU', text: 'ssss' },
        { id: '2', username: 'O9OOOOOO', text: 'ffff' },
        { id: '3', username: 'WWWWWWW', text: 'eeeeeeë' },
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
        type: 'channel_message',
        sender: 'test',
        payload: message,
      };

      this.websocket.send(JSON.stringify(payload));
      console.log(`Sent message: ${JSON.stringify(message)}`);
    }
  }

  handleMessage(message) {
    switch (message.type) {
      case 'channel_message':
        console.log('we received a connection evnet');
        console.log(message);
        break;
      default:
        console.log(`Received unknown type: ${message.type}`);
    }
    console.log(`Got message: ${JSON.stringify(message)}`);
  }
}
