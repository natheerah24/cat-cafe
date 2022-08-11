// fetch("https://catcafena.herokuapp.com/staff", {
//   method: "get",
// })
//   .thenget((response) => response.json())
//   .then((data) => {
//     let cats = [];
//     cats = data;
//     console.log(cats);
//   });

fetch("https://catcafena.herokuapp.com/staff", {
  method: "get",
})
  .then((response) => response.json())
  .then((data) => {
    let cats = [];
    cats = data;
    cats.forEach((cat) => {
      document.querySelector("#content").innerHTML += `
    <div class="Item"  onclick='showItem(this.id)' id="${cat.staffID}" >
    <h1>${cat.name}</h1>
    <img src="${cat.image}" alt="${cat.image}">
    <button>add</button>
    </div>
    `;
    });
  });
