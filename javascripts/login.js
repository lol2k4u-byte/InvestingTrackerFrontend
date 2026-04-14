function loginUser(event) {
    alert('1');
    event.preventDefault();
alert('2');
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
alert('3');
    if (username === "admin" && password === "1234") {
        alert('4');
      message.style.color = "green";
      message.textContent = "Login lykkedes!";
    } else {
        alert('5');
    message.style.color = "red";
    message.textContent = "Forkert brugernavn eller adgangskode.";
  }
alert('6');
  return false;
}
