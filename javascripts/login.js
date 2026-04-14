function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (username === "admin" && password === "1234") {
      message.style.color = "green";
      message.textContent = "Login lykkedes!";
        localStorage.setItem("token", "min-token");
    } else {
    message.style.color = "red";
    message.textContent = "Forkert brugernavn eller adgangskode.";
  }

  return false;
}

document.getElementById("loginForm").addEventListener("submit", loginUser);
