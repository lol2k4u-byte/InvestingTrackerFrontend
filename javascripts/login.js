async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch("https://investingtracker.onrender.com/Login/login", {
            method: "POST",
            headers: {
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.text();

         if (data.token) {
            localStorage.setItem("token", data.textContent);
            window.location.href = "/index.html";
        }else {
            message.style.color = "red";
            message.textContent = "Forkert brugernavn eller adgangskode.";
        }
    } catch (error) {
        console.error(error);
        message.style.color = "red";
        message.textContent = "Kan ikke kontakte serveren.";
    }
}

document
    .getElementById("loginForm")
    .addEventListener("submit", loginUser);

