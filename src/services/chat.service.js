export class ChatService {
  constructor() {
    this.url = null;
    this.websocket = null;
    this.conversations = {};
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

      switch (data.type) {
        case 'channel_message':
          console.log('we received a connection evenet');
          console.log( data );
          break;
        default:
          console.log(`Received unknown type: ${data.type}`);
      }
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
      this.websocket.send(JSON.stringify(message));
      console.log(`Sent message: ${JSON.stringify(message)}`);
    }
  }

  handleMessage(message) {
    const { chatId } = message.chatId;
  }
}
