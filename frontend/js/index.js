//bookducks@bookducks.com
//Bookducks1

//GET items
const getBookItems = async () => {
  let {data} = await axios.get("http://localhost:1337/api/books?populate=*");
  console.log(data);
  renderBooks(data);
}

getBookItems();

const getAudioItems = async () => {
  let {data} = await axios.get("http://localhost:1337/api/audiobooks?populate=*");
  console.log(data);
  renderAudiobooks(data);
}
getAudioItems();


//render items
const renderBooks = async (books) => {
  books.data.forEach(book => {
    
    const books = document.querySelector("#books");
    let genreText = "";

    book.attributes.genres.data.forEach(genre => {
      genreText += `${genre.attributes.genre} `;
    })

    books.innerHTML += `<div class="single-book">
    <img src="http://localhost:1337${book.attributes.cover.data.attributes.url}" height="150" width="100">
    <p class="item-p">Title: ${book.attributes.title}</p>
    <p class="item-p">Author: ${book.attributes.author}</p>
    <p class="item-p">Pages: ${book.attributes.pages}</p>
    <p class="item-p">Score: ${book.attributes.score}</p>
    <p class="item-p">Genre(s): ${genreText}</p>
    <p class="item-p">Lender: ${book.attributes.user.data.attributes.username}</p>
    <p class="item-p">Contact: ${book.attributes.user.data.attributes.email}</p>
    </div>`
  })
}

const renderAudiobooks = async (audiobooks) => {
  audiobooks.data.forEach(audiobook => {
    
    const audiobooks = document.querySelector("#audiobooks");
    let genreText = "";

    audiobook.attributes.genres.data.forEach(genre => {
      genreText += `${genre.attributes.genre} `;
    })

    audiobooks.innerHTML += `<div class="single-book">
    <img src="http://localhost:1337${audiobook.attributes.cover.data.attributes.url}" height="100" width="100">
    <p class="item-p">Title: ${audiobook.attributes.title}</p>
    <p class="item-p">Published: ${audiobook.attributes.published}</p>
    <p class="item-p">Length (minutes): ${audiobook.attributes.length}hours</p>
    <p class="item-p">Score: ${audiobook.attributes.score}</p>
    <p class="item-p">Genre(s): ${genreText}</p>
    <p class="item-p">Lender: ${audiobook.attributes.user.data.attributes.username}</p>
    <p class="item-p">Contact: ${audiobook.attributes.user.data.attributes.email}</p>
    </div>`
  })
}