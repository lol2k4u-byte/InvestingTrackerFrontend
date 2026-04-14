async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

      const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
    })
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.textContent);
      message.style.color = "green";
      message.textContent = "Login lykkedes!";
  }else {
    message.style.color = "red";
    message.textContent = "Forkert brugernavn eller adgangskode.";
  }

  return false;
}

document.getElementById("loginForm").addEventListener("submit", loginUser);
