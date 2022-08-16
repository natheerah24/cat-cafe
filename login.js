let registerPage = () => {
  document.querySelector("#content").innerHTML = `
<form  onsubmit="event.preventDefault()">
<input type="text" id="email" placeholder="example@gmail.com"required>
<input type="password" id="password" placeholder="password"required>
<input type="text" id="name" placeholder=" full name"required>
<input type="text" id="billing_adress" placeholder="billing address"required>
<input type="text" id="phone" placeholder="contact number" required>
<button  onclick=" registerNewUser()">register</button>
</form>
`;
};
async function VerifyUser() {
  const response = await fetch(
    "https://incredible-meerkat-9ef8b4.netlify.app/.netlify/functions/api/users/users/verify",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": JSON.parse(localStorage.token),
      },
    }
  );
  let data = await response.json();
  if (data.msg == "Unauthorized Access!") {
    // alert("login first");
    console.log(data.msg);
  } else {
    localStorage.setItem("UserName", JSON.stringify(data.user.full_name));
    localStorage.setItem("UserID", JSON.stringify(data.user.user_id));
    localStorage.setItem("UserType", JSON.stringify(data.user.user_type));
  }
}

async function registerNewUser() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const fullname = document.querySelector("#name").value;
  const billing_address = document.querySelector("#billing_adress").value;
  const phone = document.querySelector("#phone").value;
  fetch(
    "https://incredible-meerkat-9ef8b4.netlify.app/.netlify/functions/api/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "no-cors",
      body: JSON.stringify({
        email: email,
        password: password,
        full_name: fullname,
        billing_address: billing_address,
        country: "South Africa",
        phone: phone,
        user_type: "user",
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
async function sendUserData() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  fetch(
    "https://incredible-meerkat-9ef8b4.netlify.app/.netlify/functions/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "no-cors",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token", JSON.stringify(data.token));
      VerifyUser();
    });
}

let userLogin = () => {
  if (!localStorage.token) {
    document.querySelector("#userLog").innerHTML = `logout`;
    document.querySelector("#content").innerHTML = `
<form  onsubmit="event.preventDefault()">
<input type="text" id="email" placeholder="example@gmail.com"required>
<input type="password" id="password" placeholder="password"required>
<button  onclick="sendUserData()">login</button>
</form>
`;
  } else {
    document.querySelector("#userLog").innerHTML = `login`;
    localStorage.clear();
    alert("logged out");
  }
};
