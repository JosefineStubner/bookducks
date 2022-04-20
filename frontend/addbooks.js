//lol

let bookTitle = document.querySelector("#bookTitle");
let author = document.querySelector("#author");
let image = document.querySelector("#image");

const addProduct = async () => {
  //Hämtar ut filen och placerar den i en FormData
  // e.preventDefault();
  let image = document.querySelector("#image").files;
  let imgData = new FormData();
  imgData.append('files', image[0]);
  
  // Laddar upp bild till Strapi.
  axios.post("http://localhost:1337/api/upload", imgData, {
      headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
  }).then(res => {
      //Placerar den uppladdade filens id i vår nya produkt vi vill lägga till.
      let imageId = res.data[0].id;
      axios.post("http://localhost:1337/api/books", {
          //request body
              data: {
                  name: bookTitle.value,
                  price: author.value,
                  category: [1],
                  image:imageId
              }
          },
          {
              //config
              headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`
              }
          })
      })
  
}
