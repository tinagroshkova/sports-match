class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.image = "";
    this.age = "";
    this.city = "";
    this.gender = "";
    this.activities = JSON.parse(localStorage.getItem(`${this.username}_activities`)) || [];
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const userJson = localStorage.getItem("loggedInUser");
    if (userJson) {
      const userObj = JSON.parse(userJson);
      this.username = userObj.username;
      this.password = userObj.password;
      this.image = userObj.image || "";
      this.age = userObj.age || "";
      this.city = userObj.city || "";
      this.gender = userObj.gender || "";
      this.activities = userObj.activities || [];
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(`${this.username}_data`, JSON.stringify({
      image: this.image,
      age: this.age,
      city: this.city,
      gender: this.gender,
    }));
  }

  addActivity(activity) {
    if (!this.hasActivity(activity)) {
      this.activities.push(activity);
      localStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
    }
  }

  removeActivity(activity) {
    if (this.hasActivity(activity)) {
      this.activities = this.activities.filter(a => a.name !== activity.name);
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

  setLoggedInUser = (user) => {
    const loggedInUser = this.getLoggedInUser();
    if (loggedInUser) {
      loggedInUser.username = user.username;
      loggedInUser.age = user.age;
      loggedInUser.city = user.city;
      loggedInUser.gender = user.gender;
      loggedInUser.image = user.image;
      loggedInUser.saveToLocalStorage(); // call the saveToLocalStorage method
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map(u => {
        if (u.username === loggedInUser.username) {
          console.log(loggedInUser);
          return loggedInUser;
        }
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };
  
}

const userManager = new UserManager();

export default userManager;
// export class User {
//   constructor(username, password) {
//     this.username = username;
//     this.password = password;
//     this.image = "";
//     this.age = "";
//     this.city = "";
//     this.gender = "";
//     this.activities = JSON.parse(localStorage.getItem(`${this.username}_activities`)) || [];
//   }

//   addActivity(activity) {
//     if (!this.hasActivity(activity)) {
//       this.activities.push(activity);
//       localStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
//     }
//   }

//   removeActivity(activity) {
//     if (this.hasActivity(activity)) {
//       this.activities = this.activities.filter(a => a.name !== activity.name);
//       localStorage.setItem(`${this.username}_activities`, JSON.stringify(this.activities));
//     }
//   }

//   hasActivity(activity) {
//     return this.activities.some(a => a.name === activity.name);
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

//   setLoggedInUser = (user) => {
//     const loggedInUser = this.getLoggedInUser();
//     if (loggedInUser) {
//       loggedInUser.username = user.username;
//       loggedInUser.age = user.age;
//       loggedInUser.city = user.city;
//       loggedInUser.gender = user.gender;
//       loggedInUser.image = user.image;
//       localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

//       const users = JSON.parse(localStorage.getItem("users")) || [];
//       const updatedUsers = users.map(u => {
//         if (u.username === loggedInUser.username) {
//           console.log(loggedInUser);
//           return loggedInUser;
//         }
//       });
//       localStorage.setItem("users", JSON.stringify(updatedUsers));
//     }
//   };
  
// }

// const userManager = new UserManager();

// export default userManager;

