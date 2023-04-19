class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.image = "";
    this.age = "";
    this.city = "";
    this.gender = "";
    this.activities = [];
  }

  hasActivity(activity) {
    return this.activities.some(a => a.name === activity.name);
  }
}

class UserManager {
  constructor() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    this.users = users.map((user) => {
      const newUser = new User(user.username, user.password);
      newUser.id = user.id; // set existing user's id
      newUser.image = user.image || "";
      newUser.age = user.age || "";
      newUser.city = user.city || "";
      newUser.gender = user.gender || "";
      newUser.activities = user.activities || [];
      return newUser;
    });
  }

  registerUser = (username, password) => {
    const userExists = this.users.some((user) => user.username === username);

    if (userExists) {
      return Promise.reject(new Error("Username already exists"));
    }

    const user = new User(username, password,);
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
    const user = this.users.find((u) => u.username === userObj.username);
    if (!user) {
      return null;
    }
    return user;
  };

  setLoggedInUser = (user) => {
    const loggedInUser = this.getLoggedInUser();

    if (loggedInUser) {
      // Update the user's properties
      loggedInUser.username = user.username;
      loggedInUser.age = user.age;
      loggedInUser.city = user.city;
      loggedInUser.gender = user.gender;
      loggedInUser.image = user.image;
      loggedInUser.activities = user.activities;
      this.saveUserData();
    }
  }

  saveUserData() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  addActivity(activity) {
    const user = this.getLoggedInUser();
    if (user && !user.hasActivity(activity)) {
      user.activities.push(activity);
      this.saveUserData();
    }
  }

  removeActivity(activity) {
    const user = this.getLoggedInUser();
    if (user && user.hasActivity(activity)) {
      user.activities = user.activities.filter(a => a.name !== activity.name);
      this.saveUserData();
    }
  }
}
const userManager = new UserManager();

export default userManager;
// class User {
//   constructor(username, password) {
//     this.username = username;
//     this.password = password;
//     this.image = "";
//     this.age = "";
//     this.city = "";
//     this.gender = "";
//     this.activities = [];
//   }

//   hasActivity(activity) {
//     return this.activities.some(a => a.name === activity.name);
//   }
// }

// class UserManager {
//   constructor() {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     this.users = users.map((user) => {
//       const newUser = new User(user.username, user.password);
//       newUser.id = user.id; // set existing user's id
//       newUser.image = user.image || "";
//       newUser.age = user.age || "";
//       newUser.city = user.city || "";
//       newUser.gender = user.gender || "";
//       newUser.activities = user.activities || [];
//       return newUser;
//     });
//   }

//   registerUser = (username, password) => {
//     const userExists = this.users.some((user) => user.username === username);

//     if (userExists) {
//       return Promise.reject(new Error("Username already exists"));
//     }

//     const user = new User(username, password,);
//     this.users.push(user);
//     localStorage.setItem("users", JSON.stringify(this.users));
//     user.saveUserData();
//     return Promise.resolve();
//   };

//   loginUser = (username, password) => {
//     const user = this.users.find((user) => user.username === username && user.password === password);

//     if (!user) {
//       return Promise.reject(new Error("Invalid username or password"));
//     }

//     sessionStorage.setItem("loggedInUser", JSON.stringify({
//       username: user.username,
//     }));
//     return Promise.resolve();
//   };

//   logoutUser = () => {
//     sessionStorage.removeItem("loggedInUser");
//     alert("Logout successful");
//     window.location.replace("/login")
//     return Promise.resolve();
//   };

//   getLoggedInUser = () => {
//     const userJson = sessionStorage.getItem("loggedInUser");
//     if (!userJson) {
//       return null;
//     }
//     const userObj = JSON.parse(userJson);
//     const user = this.users.find((u) => u.username === userObj.username);
//     if (!user) {
//       return null;
//     }
//     return user;
//   };

//   setLoggedInUser = (user) => {
//     const loggedInUser = this.getLoggedInUser();

//     if (loggedInUser) {
//       // Update the user's properties
//       loggedInUser.username = user.username;
//       loggedInUser.age = user.age;
//       loggedInUser.city = user.city;
//       loggedInUser.gender = user.gender;
//       loggedInUser.image = user.image;
//       loggedInUser.activities = user.activities;
//       this.saveUserData();
//     }
//   }

//   saveUserData() {
//     localStorage.setItem("users", JSON.stringify(this.users));
//   }

//   addActivity(activity) {
//     const user = this.getLoggedInUser();
//     if (user && !user.hasActivity(activity)) {
//       user.activities.push(activity);
//       this.saveUserData();
//     }
//   }

//   removeActivity(activity) {
//     const user = this.getLoggedInUser();
//     if (user && user.hasActivity(activity)) {
//       user.activities = user.activities.filter(a => a.name !== activity.name);
//       this.saveUserData();
//     }
//   }
// }
// const userManager = new UserManager();

// export default userManager;

