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
      document.querySelector("#content").innerHTML += `
    <div class="Item"  onclick='showItem(this.id)' id="${cat.staffID}" >
    <h1 id="names">${cat.name}</h1>
    <img src="${cat.image}" alt="${cat.image}">
    <button class="book">Book me</button>
    </div>
    `;
    });
  });
