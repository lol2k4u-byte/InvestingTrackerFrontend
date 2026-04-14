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
    window.location.href = "/index.html";
  }else {
    message.style.color = "red";
    message.textContent = "Forkert brugernavn eller adgangskode.";
  }
}

document.getElementById("loginForm").addEventListener("submit", loginUser);
