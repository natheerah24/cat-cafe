async function UserLogin() {
  const response = await fetch(
    "https://incredible-meerkat-9ef8b4.netlify.app/.netlify/users/login",
    {
      method: "POST",
      body: JSON.stringify({
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
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
  // if (data.msg === "pasword incorrect") {
  //   alert("you have mistaken your password my child");
  // } else if (data == "Email not found please register") {
  //   alert("Email not found please register");
  // }
  else {
    localStorage.setItem("token", JSON.stringify(data.token));
    VerifyUser();
    alert("logged in");
  }
}
