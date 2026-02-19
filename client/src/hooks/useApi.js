export const useApi = () => {

    const base = "http://localhost:5000";

    const post = async (url, body) => {
        const res = await fetch(base + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        return res.json();
    };

    const get = async (url) => {
        const res = await fetch(base + url);
        return res.json();
    };

    // ⭐ ADD THIS DELETE METHOD
    const del = async (url) => {
        const res = await fetch(base + url, {
            method: "DELETE"
        });

        return res.json();
    };

    // ⭐ RETURN del ALSO
    return { post, get, del };
};

