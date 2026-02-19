import { useApi } from "../hooks/useApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateLink() {

    const api = useApi();

    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");
    const [copied, setCopied] = useState(false);   // ✅ must be inside component

    const navigate = useNavigate();

    const createLink = async () => {

        const data = await api.post("/create", { username });

        const generatedLink =
            "http://localhost:3000/feedback/" + data.linkId;

        setLink(generatedLink);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px"
        }}>
            <div style={{
                padding: "30px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                textAlign: "center"
            }}>
                <h2>Create Anonymous Feedback Link</h2>

                <input
                    placeholder="Enter your name"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <button onClick={createLink}>Generate Link</button>

                {link && (
                    <>
                        <p>{link}</p>
                        <button onClick={copyLink}>Copy Link</button>
                        <button onClick={() =>
                            navigate("/dashboard/" + link.split("/").pop())
                        }>
                            Go To Dashboard
                        </button>

                        {copied && (
                            <p style={{ color: "#22c55e" }}>
                                Link copied!
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

