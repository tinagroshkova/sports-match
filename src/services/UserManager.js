class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.activities = JSON.parse(localStorage.getItem(`${this.username}_activities`)) || [];
  }

  addActivity(activity) {
    const index = this.activities.findIndex(a => a.name === activity.name);
    if (index === -1) {
      this.activities.push(activity);
      localStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
    }
  }

  removeActivity(activity) {
    const index = this.activities.findIndex(a => a.name === activity.name);
    if (index !== -1) {
      this.activities.splice(index, 1);
      localStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
    }
  }

  hasActivity(activity) {
    return this.activities.some(a => a.name === activity.name);
  }
}

class UserManager {
  constructor() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    this.users = users.map((user) => new User(user.username, user.password));
  }

  registerUser = (username, password) => {
    const userExists = this.users.some((user) => user.username === username);

    if (userExists) {
      return Promise.reject(new Error("Username already exists"));
    }

    const user = new User(username, password);
    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));
    return Promise.resolve();
  };

  loginUser = (username, password) => {
    const user = this.users.find((user) => user.username === username && user.password === password);

    if (!user) {
      return Promise.reject(new Error("Invalid username or password"));
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    return Promise.resolve();
  };

  logoutUser = () => {
    localStorage.removeItem("loggedInUser");
    return Promise.resolve();
  };

  getLoggedInUser = () => {
    const userJson = localStorage.getItem("loggedInUser");
    if (!userJson) {
      return null;
    }
    const userObj = JSON.parse(userJson);
    return new User(userObj.username, userObj.password);
  };
}

const userManager = new UserManager();

export default userManager;
// class User {
//   constructor(username, password) {
//     this.username = username;
//     this.password = password;
//     this.activities = JSON.parse(localStorage.getItem(`${this.username}_activities`)) || [];
//   }

//   addActivity(activity) {
//     const index = this.activities.findIndex(a => a.name === activity.name);
//     if (index === -1) {
//       this.activities.push(activity);
//       localStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
//     }
//   }

//   removeActivity(activity) {
//     const index = this.activities.findIndex(a => a.name === activity.name);
//     if (index !== -1) {
//       this.activities.splice(index, 1);
//       localStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
//     }
//   }

//   hasActivity(activity) {
//     return this.activities.includes(activity);
//   }
// }

// class UserManager {
//   constructor() {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     this.users = users.map((user) => new User(user.username, user.password));
//   }

//   registerUser = (username, password) => {
//     const userExists = this.users.some((user) => user.username === username);

//     if (userExists) {
//       return Promise.reject(new Error("Username already exists"));
//     }

//     const user = new User(username, password);
//     this.users.push(user);
//     localStorage.setItem("users", JSON.stringify(this.users));
//     return Promise.resolve();
//   };

//   loginUser = (username, password) => {
//     const user = this.users.find((user) => user.username === username && user.password === password);

//     if (!user) {
//       return Promise.reject(new Error("Invalid username or password"));
//     }

//     localStorage.setItem("loggedInUser", JSON.stringify(user));
//     return Promise.resolve();
//   };

//   logoutUser = () => {
//     localStorage.removeItem("loggedInUser");
//     return Promise.resolve();
//   };

//   getLoggedInUser = () => {
//     const userJson = localStorage.getItem("loggedInUser");
//     if (!userJson) {
//       return null;
//     }
//     const userObj = JSON.parse(userJson);
//     return new User(userObj.username, userObj.password);
//   };
// }

// const userManager = new UserManager();

// export default userManager;
