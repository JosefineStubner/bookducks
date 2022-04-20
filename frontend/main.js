//signout
const signoutBtn = document.querySelector("#signout-btn");

signoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sessionStorage.clear();
  location.reload();
  location.href = "index.html";
})

//visibility

