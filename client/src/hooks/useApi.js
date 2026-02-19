const BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

export const useApi = () => {

    const post = async (url, body) => {
        const res = await fetch(BASE_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        return res.json();
    };

    const get = async (url) => {
        const res = await fetch(BASE_URL + url);
        return res.json();
    };

    const del = async (url) => {
        const res = await fetch(BASE_URL + url, {
            method: "DELETE"
        });
        return res.json();
    };

    return { post, get, del };
};


