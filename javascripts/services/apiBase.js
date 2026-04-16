export function getApiBase() {

    switch(window.location.hostname.toLowerCase()) {
        case "localhost":
        case "127.0.0.1": 
            return "https://localhost:7094";
    };

    return "https://investingtracker.onrender.com";
};

export function getHeaders() {
    const token = localStorage.getItem("auth-token");
    const auth = "Bearer " + token;

    return {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization" : auth
    };
}

export function setAuthToken(token) {
    localStorage.setItem("auth-token", token);
}