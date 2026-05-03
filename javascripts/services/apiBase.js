const authLocalItemKey = "auth-token";

function getApiBase() {

    switch (window.location.hostname.toLowerCase()) {
        case "localhost":
        case "127.0.0.1":
            return "https://localhost:7094/";
    };

    return "https://investingtracker.onrender.com/";
};

function getHeaders(token) {
    const headers = {
        "accept": "text/plain",
        "Content-Type": "application/json"
    };

    if (token != null) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

function getRequestInfo(method, token, obj) {
    const requestInfo = {
        method: method,
        headers: getHeaders(token)
    };

    if (obj != null) {
        requestInfo["body"] = JSON.stringify(obj)
    };

    return requestInfo;
}

function getToken() {
    return localStorage.getItem(authLocalItemKey);
}

export function setToken(token) {
    localStorage.setItem(authLocalItemKey, token);
}

function removeToken() {
    localStorage.removeItem(authLocalItemKey);
}

function redirect() {
    window.location.href = `login.html`;
}

export async function getResponseReqAuth(endpoint, method, obj, message) {
    const token = getToken();

    if (token != null) {
        const response = await getResponse(endpoint, method, token, obj, message);

        if (response.status === 200) {
            return await response.json();
        } else if (response.status === 401) {
            redirect();
        } else {
            console.error(response.status);
            message.textContent = "Ukendt fejl";
        }
    } else {
        redirect();
    }

    return null;
};

export async function getResponse(endpoint, method, token, obj, message) {

    const url = getApiBase() + endpoint;
    const requestInfo = getRequestInfo(method, token, obj);

    try {
        const response = await fetch(url, requestInfo);

        return response;
    } catch (error) {
        console.error(error);
        message.textContent = "Ingen forbindelse til serveren";
    }

    return null;
};
