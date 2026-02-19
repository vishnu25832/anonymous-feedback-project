const BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

export const useApi = () => {

    const handleResponse = async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "API Error");
        }
        return res.json();
    };

    const post = async (url, body) => {
        const res = await fetch(BASE_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        return handleResponse(res);
    };

    const get = async (url) => {
        const res = await fetch(BASE_URL + url);
        return handleResponse(res);
    };

    const del = async (url) => {
        const res = await fetch(BASE_URL + url, {
            method: "DELETE"
        });

        return handleResponse(res);
    };

    return { post, get, del };
};



