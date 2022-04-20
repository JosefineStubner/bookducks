//get user profile

let userId = sessionStorage.getItem("id")
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

//render user books

//AAAAAHHH PROBLEEEEEEEM
const renderUserBooks = async (userBooks) => {
  console.log("books be here");
  userBooks.data.forEach(book => {
    
    let { title, author, pages, score, user, genres, cover } = book.attributes;

    let bookId = user.data.id;

    console.log(bookId, user)

    if (bookId === user.data.id) {
    const userBooks = document.querySelector("#user-books");
    let genreText = "";

    genres.data.forEach(genre => {
      genreText = `${genre.attributes.genre}`;
    })

    userBooks.innerHTML += `<div class="singleBook">
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

//render user audiobooks

const renderUserAudio = async (userAudio) => {
  userAudio.data.forEach(audiobook => {
    
    const userAudio = document.querySelector("#user-audio");
    let genreText = "";

    audiobook.attributes.genres.data.forEach(genre => {
      genreText = `${genre.attributes.genre}`;
    })

    userAudio.innerHTML += `<div class="singleBook">
    <img src="http://localhost:1337${audiobook.attributes.cover.data.attributes.url}" height="100" width="100">
    <p class="item-p">Title: ${audiobook.attributes.title}</p>
    <p class="item-p">Published: ${audiobook.attributes.published}</p>
    <p class="item-p">Length: ${audiobook.attributes.length}hours</p>
    <p class="item-p">Score: ${audiobook.attributes.score}</p>
    <p class="item-p">Genre(s): ${genreText}</p>
    <p class="item-p">Lender: ${audiobook.attributes.user.data.attributes.username}</p>
    <p class="item-p">Contact: ${audiobook.attributes.user.data.attributes.email}</p>
    </div>`
  })
}