rsconsole.log = 0;
async function showItem(id) {
  const response = await fetch(
    "https://incredible-meerkat-9ef8b4.netlify.app/.netlify/functions/api/staff/" +
      `${id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  let data = await response.json();
  let staff = data;
  staff.forEach((person) => {
    document.querySelector("#basket").innerHTML += `
<div class="Item" >
<h1>${person.name}</h1>
<img src="${person.image}" alt="${person.image}">
<input type="range" min="1" max="100" value="50" class="slider" onchange="getTime(this.id)" id="mayonnaiseIsADrink${person.staffID}">

</div>
`;
  });
}
let cart =localStorage.cart
cart.forEach((order),
document.querySelector('#basket').innerHTML=``,
document.querySelector('#basket').innerHTML+=`
 <div class="Item" >
<h1>${order.name}</h1>
<img src="${order.image}" alt="${order.image}">
<input type="range" min="1" max="100" value="50" class="slider" onchange="getTime(this.id)" id="mayonnaiseIsADrink${order.staffID}">
</div>
`

)
// Not displaying
let getTime = (id) => {
  let personell = (id) => {
    let staff_ID = id.split("k");
    return staff_ID.pop();
  };
  let booking = {
    user_id: localStorage.user_id,
    staff: personell(id),
    duration: document.querySelector(`#` + id).value,
    status: "booked",
  };
  cart.push(booking);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Checkout
let checkOut = () => {
  let selection = JSON.parse(localStorage.cart);

  selection.forEach((order) => {
    async function ufn() {
      const response = await fetch(
        "https://incredible-meerkat-9ef8b4.netlify.app/.netlify/functions/api/orders",
        {
          method: "POST",
          body: JSON.stringify({
            user_id: order.user_id,
            staff_ID: order.staff,
            amount: order.duration,
            status: order.status,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      let data = await response.json();
      if (data.status === "error") {
        alert(data.error);
      }
    }
    ufn();
  });
  localStorage.cart = null;
  alert("ordered");
};
