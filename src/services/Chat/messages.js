export class Message {
  constructor() {
    this.id;
    this.userId;
    this.chatId;
    // this.messageType = null;
    this.timestamp;
    this.content;
  }
  // deserialize(jsonData) {
  //   return JSON.parse(jsonData);
  // }
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
