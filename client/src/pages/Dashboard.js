import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export default function Dashboard() {

    const api = useApi();
    const { id } = useParams();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadMessages = async () => {
            try {
                const data = await api.get("/messages/" + id);
                setMessages(Array.isArray(data) ? data : []);
            } catch (err) {
                console.log(err);
                setMessages([]);
            }
            setLoading(false);
        };

        loadMessages();

        const interval = setInterval(loadMessages, 3000);

        return () => clearInterval(interval);

    }, [id, api]);   // ⭐ correct dependencies

    const deleteMessage = async (messageId) => {

        setMessages(prev => prev.filter(m => m._id !== messageId));

        try {
            await api.del("/message/" + messageId);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{
            background: "#111",
            minHeight: "100vh",
            color: "white",
            paddingTop: "50px",
            textAlign: "center"
        }}>
            <h2>Your Anonymous Messages</h2>

            {loading && <p>Loading messages...</p>}

            {!loading && messages.length === 0 && (
                <p>No feedback yet. Share your link!</p>
            )}

            <div style={{
                maxWidth: "500px",
                margin: "auto"
            }}>
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className="card"
                        style={{
                            background: "#1e1e1e",
                            padding: "15px",
                            marginTop: "15px",
                            borderRadius: "10px",
                            textAlign: "left",
                            animation: "fadeIn 0.3s ease"
                        }}
                    >
                        <p>{msg.text}</p>

                        <small style={{ color: "#aaa" }}>
                            {new Date(msg.createdAt).toLocaleString()}
                        </small>

                        <br /><br />

                        <button
                            style={{ background: "#dc2626" }}
                            onClick={() => deleteMessage(msg._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}


