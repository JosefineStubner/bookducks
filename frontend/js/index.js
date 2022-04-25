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
    <p class="item-p"><b>Title:</b> ${book.attributes.title}</p>
    <p class="item-p"><b>Author:</b> ${book.attributes.author}</p>
    <p class="item-p"><b>Pages:</b> ${book.attributes.pages}</p>
    <p class="item-p"><b>Score:</b> ${book.attributes.score}</p>
    <p class="item-p"><b>Genre(s):</b> ${genreText}</p>
    <p class="item-p"><b>Lender:</b> ${book.attributes.user.data.attributes.username}</p>
    <p class="item-p"><b>Contact:</b> ${book.attributes.user.data.attributes.email}</p>
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
    <div class="height-div"></div>
    <img src="http://localhost:1337${audiobook.attributes.cover.data.attributes.url}" height="100" width="100">
    <div class="height-div2"></div>
    <p class="item-p"><b>Title:</b> ${audiobook.attributes.title}</p>
    <p class="item-p"><b>Published:</b> ${audiobook.attributes.published}</p>
    <p class="item-p"><b>Length:</b> ${audiobook.attributes.length} minutes</p>
    <p class="item-p"><b>Score:</b> ${audiobook.attributes.score}</p>
    <p class="item-p"><b>Genre(s):</b> ${genreText}</p>
    <p class="item-p"><b>Lender:</b> ${audiobook.attributes.user.data.attributes.username}</p>
    <p class="item-p"><b>Contact:</b> ${audiobook.attributes.user.data.attributes.email}</p>
    </div>`
  })
}