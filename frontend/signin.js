//Log in
const loginBtn = document.querySelector("#login-btn")

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

const login = async () => {
  let loginUsername = document.querySelector("#username");
  let loginPassword = document.querySelector("#password");

    let response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: loginUsername.value,
        password: loginPassword.value,
    });
    console.log(response);
    sessionStorage.setItem("token", response.data.jwt);
    checkIfLoggedIn()
}

//Check if logged in.
const checkIfLoggedIn = () => {
  if (sessionStorage.getItem("token")) {
    
    //sätt classList.hidden på nav-länkar i main.js?
    document.querySelector("#login-container").classList.add("hidden");
    location.href = "profile.html";
  }
};

// Register
const registerBtn = document.querySelector("#register-btn");

//OBS ändra så att denna skickar till profilsida när registrerad.
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  register();
})

const register = async () => {
  console.log("register");

  const registerUsername = document.querySelector("#register-username");
  const registerEmail = document.querySelector("#register-email");
  const registerPassword = document.querySelector("#register-password");

  let response = await axios.post("http://localhost:1337/api/auth/local/register", {
    username: registerUsername.value,
    password: registerPassword.value,
    email: registerEmail.value
  });
  console.log(response);
  sessionStorage.setItem("token", response.data.jwt);
  // location.href = "profile.html";

  checkIfLoggedIn();
}


// check if logged in
checkIfLoggedIn();
