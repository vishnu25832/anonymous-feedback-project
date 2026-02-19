import { useParams } from "react-router-dom";
import { useState } from "react";

export default function SendFeedback() {
    const { id } = useParams();
    const [text, setText] = useState("");

    const sendMessage = async () => {
        await fetch("http://localhost:5000/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                linkId: id,
                text
            })
        });

        alert("Feedback Sent Successfully!");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Send Anonymous Feedback</h2>

            <textarea
                placeholder="Type your feedback..."
                onChange={(e) => setText(e.target.value)}
            />

            <br /><br />

            <button onClick={sendMessage}>Send Feedback</button>
        </div>
    );
}
