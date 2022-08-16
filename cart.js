let cart =[]

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
  cart.push(data[0])
  localStorage.setItem("cart", JSON.stringify(cart));

  staff.forEach((person) => {
//     document.querySelector("#basket").innerHTML += `
// <div class="Item" >
// <h1>${person.name}</h1>
// <img src="${person.image}" alt="${person.image}">
// <input type="range" min="1" max="100" value="1" class="slider" onchange="getTime(this.id)" id="mayonnaiseIsADrink${person.staffID}">
// </div>
// `;
alert(`booked ${person.name}` )

  });
}



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
          mode:"no-cors",
          body: JSON.stringify({
            staff_ID: order.staff,
            user_id: order.user_id,
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
      alert(`order No`+data.msg);
    }
    ufn();
  });
  localStorage.cart = null;
};
