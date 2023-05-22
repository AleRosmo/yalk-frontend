export default class Account {
  constructor({ id = null, email = null, username = null, password = null }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
  }
  
}
