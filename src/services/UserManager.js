class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.activities = JSON.parse(localStorage.getItem(`${this.username}_activities`)) || [];
  }

  addActivity(activity) {
    this.activities.push(activity);
    localStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
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
      const userJson = localStorage.getItem("loggedInUser");
      if (!userJson) {
        return null;
      }
      const userObj = JSON.parse(userJson);
      return new User(userObj.username, userObj.password);
    }
  }
  
  export default UserManager;