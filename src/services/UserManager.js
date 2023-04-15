class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.image = "";
    this.age = "";
    this.city = "";
    this.gender = "";
    this.activities = JSON.parse(sessionStorage.getItem(`${this.username}_activities`)) || [];
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const userJson = localStorage.getItem(`${this.username}_data`);
    if (userJson) {
      const userObj = JSON.parse(userJson);
      this.image = userObj.image || "";
      this.age = userObj.age || "";
      this.city = userObj.city || "";
      this.gender = userObj.gender || "";
      this.activities = userObj.activities || [];
    }
  }

  saveUserData() {
    localStorage.setItem(`${this.username}_data`, JSON.stringify({
      username: this.username,
      password: this.password,
      image: this.image,
      age: this.age,
      city: this.city,
      gender: this.gender,
      activities: this.activities,
    }));
  }

  addActivity(activity) {
    if (!this.hasActivity(activity)) {
      this.activities.push(activity);
      sessionStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
      this.saveUserData();
    }
  }

  removeActivity(activity) {
    if (this.hasActivity(activity)) {
      this.activities = this.activities.filter(a => a.name !== activity.name);
      sessionStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
      this.saveUserData();
    }
  }

  hasActivity(activity) {
    return this.activities.some(a => a.name === activity.name);
  }
}

class UserManager {
  constructor() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    this.users = users.map((user) => {
      return new User(user.username, user.password);
    });
  }

  registerUser = (username, password) => {
    const userExists = this.users.some((user) => user.username === username);

    if (userExists) {
      return Promise.reject(new Error("Username already exists"));
    }

    const user = new User(username, password);
    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));
    user.saveUserData();
    return Promise.resolve();
  };

  loginUser = (username, password) => {
    const user = this.users.find((user) => user.username === username && user.password === password);

    if (!user) {
      return Promise.reject(new Error("Invalid username or password"));
    }

    sessionStorage.setItem("loggedInUser", JSON.stringify({
      username: user.username,
      password: user.password,
      image: user.image,
      age: user.age,
      city: user.city,
      gender: user.gender,
      activities: user.activities,
    }));
    return Promise.resolve();
  };

  logoutUser = () => {
    sessionStorage.removeItem("loggedInUser");
    alert("Logout successful");
    window.location.replace("/login")
    return Promise.resolve();
  };

  getLoggedInUser = () => {
    const userJson = sessionStorage.getItem("loggedInUser");
    if (!userJson) {
      return null;
    }
    const userObj = JSON.parse(userJson);
    return new User(userObj.username, userObj.password);
  };

  setLoggedInUser = (user) => {
    const loggedInUser = this.getLoggedInUser();
  
    if (loggedInUser) {
      loggedInUser.username = user.username;
      loggedInUser.age = user.age;
      loggedInUser.city = user.city;
      loggedInUser.gender = user.gender;
      loggedInUser.image = user.image;
      loggedInUser.activities = user.activities; // Add this line to copy the activities property
      loggedInUser.saveUserData();
  
      // Store all the users and their properties in localStorage
      const users = this.users.map(u => {
        if (u.username === loggedInUser.username) {
          return loggedInUser;
        }
        return u;
      });
      console.log(users);
      sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
  };
}

const userManager = new UserManager();

export default userManager;
