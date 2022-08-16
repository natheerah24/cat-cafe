
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
    alert(`welcome `+ await JSON.parse(localStorage.UserName))

  }
}

async function sendUserData() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  fetch(
    "https://incredible-meerkat-9ef8b4.netlify.app/.netlify/functions/api/users/login",
    {
      method: "POST",
    //   mode:"no-cors",
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


