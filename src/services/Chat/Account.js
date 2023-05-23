export default class Account {
  constructor({ ID = null, email = null, username = null, password = null }) {
    this.ID = ID;
    this.email = email;
    this.username = username;
    this.password = password;
  }
  
}
