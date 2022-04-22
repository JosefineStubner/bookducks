//signout
const signoutBtn = document.querySelector("#signout-btn");

signoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sessionStorage.clear();
  location.reload();
  location.href = "index.html";
})

//visibility
let visibility = () => {
  if(sessionStorage.getItem('token')){
    document.getElementById('signin-link').classList.add('hidden');
  }else{
    document.getElementById('profile-link').classList.add('hidden');
    document.getElementById('signout-btn').classList.add('hidden');
  }
}
visibility();
