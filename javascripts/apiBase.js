export function getApiBase() {

    switch(window.location.hostname.toLowerCase()) {
        case "localhost":
        case "127.0.0.1": 
            return "https://localhost:7094";
    };

    return "https://investingtracker.onrender.com";
};