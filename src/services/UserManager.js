class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }
  
  class UserManager {
    static registerUser(username, password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.username === username);
  
      if (userExists) {
        return Promise.reject(new Error("Username already exists"));
      }
  
      const user = new User(username, password);
      localStorage.setItem("users", JSON.stringify([...users, user]));
      return Promise.resolve();
    }
  
    static loginUser(username, password) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
  
      if (!user) {
        return Promise.reject(new Error("Invalid username or password"));
      }
  
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      return Promise.resolve();
    }
  
    static logoutUser() {
      localStorage.removeItem("loggedInUser");
      return Promise.resolve();
    }
  
    static getLoggedInUser() {
      return JSON.parse(localStorage.getItem("loggedInUser"));
    }
  }
  
  export default UserManager;