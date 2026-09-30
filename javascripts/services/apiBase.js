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

function getRequestInfo(method, token, obj, signal) {
    const requestInfo = {
        method: method,
        headers: getHeaders(token)
    };

    if (obj != null) {
        requestInfo["body"] = JSON.stringify(obj)
    };

    if (signal != null) {
        requestInfo["signal"] = signal;
    }

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

export async function getResponseReqAuthStream(endpoint, method, obj, message, callback, signal = null) {
    const response = await getResponseReqAuth(endpoint, method, obj, message, signal);

    if (response != null) {
        const reader = response.body.getReader();
        await processReader(reader, callback);
    }
}

async function processReader(reader, callback) {
    const decoder = new TextDecoder();

    let buffer = "";

    try {
        while (true) {
            const { value, done } = await reader.read();

            if (done) {
                break;
            }

            buffer += decoder.decode(value, { stream: true });

            const events = buffer.split("\n\n");
            buffer = events.pop();

            for (const event of events) {
                if (event.startsWith("data: ")) {
                    const data = JSON.parse(event.substring(6));

                    await callback(data);
                }
            }
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            console.error(error);
        }
    }
} 

export async function getResponseReqAuthJson(endpoint, method, obj, message, signal = null) {
    const response = await getResponseReqAuth(endpoint, method, obj, message, signal);

    if (response != null)
        return await response.json();
}

export async function getResponseReqAuth(endpoint, method, obj, message, signal = null) {
    const token = getToken();

    if (token != null) {
        const response = await getResponse(endpoint, method, token, obj, message, signal);

        if (response.status === 200) {
            return response;
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

export async function getResponse(endpoint, method, token, obj, message, signal = null) {

    const url = getApiBase() + endpoint;
    const requestInfo = getRequestInfo(method, token, obj, signal);

    try {
        const response = await fetch(url, requestInfo);

        return response;
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Request cancelled");
        } else {
            console.error(error);
            message.textContent = "Ingen forbindelse til serveren";
        }
    }

    return null;
};
