export class Message {
  constructor() {
    this.id;
    this.userId;
    this.chatId;
    // this.messageType = null;
    this.timestamp;
    this.content;
  }
  deserialize(jsonData) {
    var message = JSON.parse(jsonData);
    this.id = message.id;
    this.userId = message.userId;
    this.chatId = message.conversationId;
    // this.messageType = message.messageType;
    this.timestamp = message.timestamp;
    this.content = null;
  }
  serialize() {
    return JSON.stringify(this);
  }
  new({ chatId, messageType, timestamp, content }) {
    this.chatId = chatId;
    // this.messageType = messageType;
    this.timestamp = timestamp;
    this.content = content;
  }
}
