
const newLocal = (resetMenu = () => {
  document.querySelector("#navMenu").classList.remove("active");
});
let displayCat = () => {
  return Math.ceil(Math.random() * 32);
};
let revealContent = () => {
  document.querySelector("#allCats").classList.toggle("active");
};
fetch(
  "https://incredible-meerkat-9ef8b4.netlify.app/.netlify/functions/api/staff/" +
    displayCat(),
  {
    method: "get",
  }
)
  .then((response) => response.json())
  .then((data) => {
    let posterCat = [];
    posterCat = data;
    posterCat.forEach((cat) => {
      document.querySelector("#content").innerHTML += `
    <div class="Item"  id="${cat.staffID}" >
    <h1>${cat.name}</h1>
    <img src="${cat.image}" alt="${cat.image}">
    <button onclick="revealContent()" id='viewButton'>view more</button>
    </div>
    `;
    });
  });


fetch(
  "https://incredible-meerkat-9ef8b4.netlify.app/.netlify/functions/api/staff",
  {
    method: "get",
  }
)
  .then((response) => response.json())
  .then((data) => {
    let cats = [];
    cats = data;
    cats.forEach((cat) => {
      document.querySelector("#allCats").innerHTML += `
       <div class="Item"  onclick='showItem(this.id)' id="${cat.staffID}" >
       <h1 id="names">${cat.name}</h1>
       <img src="${cat.image}" alt="${cat.image}">
       <div class="row">
    <div class="col-md-6" >
    <button class="book"><i class="fa-solid fa-cart-shopping"></i></button>
    </div>
    <div class="col-md-6">
    <button class="book"><i class="fa-solid fa-eye"></i></button>
    </div>
    </div>
       </div>
       `;
    });
  });
