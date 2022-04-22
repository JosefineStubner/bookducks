//lol

const addBookBtn = document.querySelector("#add-book-btn");
const addAudiobookBtn = document.querySelector("#add-audiobook-btn");

let userId = sessionStorage.getItem("userId");
console.log(userId);

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBook();
});

addAudiobookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addAudiobook();
  });

const addBook = async () => {
  let title = document.querySelector("#bookTitle").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let score = document.querySelector("#score").value;
  let genres = [];
  let checkboxes = document.querySelectorAll("#genre");

  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      genres.push(checkbox.value);
    }
  }

  console.log(genres);

  let image = document.querySelector("#image").files;
  let imgData = new FormData();
  imgData.append("files", image[0]);

  // Laddar upp bild till Strapi.
  axios
    .post("http://localhost:1337/api/upload", imgData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log({
        title,
        author,
        pages,
        score,
        genres,
        user: [userId],
        cover: res.data[0].id,
      });
      //Placerar den uppladdade filens id i vår nya produkt vi vill lägga till.
      axios.post(
        "http://localhost:1337/api/books",
        {
          //request body
          data: {
            title,
            author,
            pages,
            score,
            genres,
            user: [userId],
            cover: res.data[0].id,
          },
        },
        {
          //config
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
    });
};

const addAudiobook = async () => {
    let title = document.querySelector("#audioTitle").value;
    let published = document.querySelector("#published").value;
    let length = document.querySelector("#length").value;
    let score = document.querySelector("#audioscore").value;
    let genres = [];
    let checkboxes = document.querySelectorAll("#audiogenre");
  
    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        genres.push(checkbox.value);
      }
    }
  
    console.log(genres);
  
    let image = document.querySelector("#audioimage").files;
    let imgData = new FormData();
    imgData.append("files", image[0]);
  
    // Laddar upp bild till Strapi.
    axios
      .post("http://localhost:1337/api/upload", imgData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log({
          title,
          published,
          length,
          score,
          genres,
          user: [userId],
          cover: res.data[0].id,
        });
        //Placerar den uppladdade filens id i vår nya produkt vi vill lägga till.
        axios.post(
          "http://localhost:1337/api/audiobooks",
          {
            //request body
            data: {
              title,
              published,
              length,
              score,
              genres,
              user: [userId],
              cover: res.data[0].id,
            },
          },
          {
            //config
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
      });
  };