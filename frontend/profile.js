//upload books

const uploadBooksBtn = document.querySelector("#upload-btn")

uploadBooksBtn.addEventListener("click", () => {
  location.href = "addbooks.html";
  console.log("I was clicked");
})

//get user profile

let userId = sessionStorage.getItem("userId")
console.log(userId);

const getUser = async () => {
  let { data } = await axios.get("http://localhost:1337/api/users/me", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  console.log(data);
  renderUser(data);
};

getUser();

//render user profile

const renderUser = async (user) => {
  console.log(user.username);
  // user.data.for(user => {  
  const userInfo = document.querySelector("#user-info");

  userInfo.innerHTML += `
  <h3>Welcome to your profile page!</h3>
  <ul>
  <li>Username: ${user.username}</li>
  <li>Email: ${user.email}</li>
  <li>ID: ${user.id}</li>
  <li>Registered: ${user.createdAt.slice(0,10)}</li>
  </ul>`
}

//get user books

const getUserBooks = async () => {
  let {data} = await axios.get("http://localhost:1337/api/books?populate=*", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  console.log(data);
  renderUserBooks(data);
}

getUserBooks();

//GET user Audio

const getUserAudio = async () => {
  let {data} = await axios.get("http://localhost:1337/api/audiobooks?populate=*", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  console.log(data);
  renderUserAudio(data);
}

getUserAudio();

//render user books

//AAAAAHHH PROBLEEEEEEEM
const renderUserBooks = async (userBooks) => {
  userBooks.data.forEach(book => {
    
    let { title, author, pages, score, user, genres, cover } = book.attributes;

    let bookId = user.data.id;

    if (bookId == userId) {
    const userBooks = document.querySelector("#user-books");
    let genreText = "";

    genres.data.forEach(genre => {
      genreText = `${genre.attributes.genre}`;
    })

    userBooks.innerHTML += `<div class="single-book">
    <img src="http://localhost:1337${cover.data.attributes.url}" height="150" width="100">
    <p class="item-p">Title: ${title}</p>
    <p class="item-p">Author: ${author}</p>
    <p class="item-p">Pages: ${pages}</p>
    <p class="item-p">Score: ${score}</p>
    <p class="item-p">Genre(s): ${genreText}</p>
    <p class="item-p">Lender: ${user.data.attributes.username}</p>
    <p class="item-p">Contact: ${user.data.attributes.email}</p>
    </div>`
  }
  })
}

//GET user audiobooks

const renderUserAudio = async (userAudio) => {
  userAudio.data.forEach(userAudio => {
    
    let { title, published, length, score, user, genres, cover } = userAudio.attributes;

    let audioId = user.data.id;

    if (audioId == userId) {
    const userAudio = document.querySelector("#user-audio");
    let genreText = "";

    genres.data.forEach(genre => {
      genreText = `${genre.attributes.genre}`;
    })

    userAudio.innerHTML += `<div class="single-book">
    <img src="http://localhost:1337${cover.data.attributes.url}" height="150" width="100">
    <p class="item-p">Title: ${title}</p>
    <p class="item-p">Author: ${published}</p>
    <p class="item-p">Pages: ${length}</p>
    <p class="item-p">Score: ${score}</p>
    <p class="item-p">Genre(s): ${genreText}</p>
    <p class="item-p">Lender: ${user.data.attributes.username}</p>
    <p class="item-p">Contact: ${user.data.attributes.email}</p>
    </div>`
  }
  })
}