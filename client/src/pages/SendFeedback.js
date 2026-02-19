import { useParams } from "react-router-dom";
import { useState } from "react";
import { useApi } from "../hooks/useApi";

export default function SendFeedback() {

    const { id } = useParams();
    const api = useApi();

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!text.trim()) {
            alert("Please write some feedback");
            return;
        }

        try {
            setLoading(true);

            await api.post("/message", {
                linkId: id,
                text
            });

            setText("");
            alert("Feedback Sent Successfully!");

        } catch (err) {
            console.log(err);
            alert("Failed to send feedback");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Send Anonymous Feedback</h2>

            <textarea
                placeholder="Type your feedback..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <br /><br />

            <button onClick={sendMessage} disabled={loading}>
                {loading ? "Sending..." : "Send Feedback"}
            </button>
        </div>
    );
}
