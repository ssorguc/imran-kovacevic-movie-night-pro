"use strict"

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

const users = [
  new User("user1", "pass123"),
  new User("user2", "securePwd"),
  new User("user3", "securePwd"),
];
let userNavbar = document.getElementById("user-navbar");
userNavbar.hidden = true;
let usernameNav = document.getElementById("username-nav");
const user = localStorage.getItem("user");
if (!(user === undefined || user === null || user === "")) {
  document.getElementById("login-nav-item").hidden = true;
  userNavbar.hidden = false;
  usernameNav.textContent = user;
}

function attemptLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  let user = users.find(user => user.username === username && user.password === password)
  if (user !== undefined) {
    document.getElementById("loginMessage").style.color = "green";
    document.getElementById("loginMessage").innerHTML = "Login successful";
    document.getElementById("loginForm").hidden = true;
    document.getElementById("login-nav-item").hidden = true;
    localStorage.setItem("user", username);
    userNavbar.hidden = false;
    usernameNav.textContent = username;
  }
  else {
    document.getElementById("loginMessage").style.color = "red";
    document.getElementById("loginMessage").innerHTML = "Login failed. Check your email or passwrod.";
  }
}

function createAccount() {
  let newUsername = document.getElementById("usernameSignUp").value;
  let newPass = document.getElementById("passwordSignUp").value;

  //Pokusaj naci postojeceg korisnika
  let postojeciUser = users.find(user => user.username === newUsername);

  if (postojeciUser === undefined) {
    let newUser = new User(newUsername, newPass);
    users.push(newUser);
    document.getElementById("signupMessage").innerHTML = "You have created and account. Welcome!"
    document.getElementById("signupForm").hidden = true;
    let homepage = document.getElementById("homepage-link");
    homepage.href = "index.html";
    homepage.textContent = "Back to home page";
    localStorage.setItem("user", newUsername);
    document.getElementById("login-nav-item").hidden = true;
    userNavbar.hidden = false;
    usernameNav.textContent = newUsername;
  } else {
    document.getElementById("signupMessage").innerHTML = "Username is taken"
  }
}

function logOut() {
  debugger;
  userNavbar.hidden = true;
  localStorage.setItem("user", "")
  document.getElementById("login-nav-item").hidden = false;
}