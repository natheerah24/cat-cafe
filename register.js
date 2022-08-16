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
      let msg =data.msg
      alert(msg)
    });
}