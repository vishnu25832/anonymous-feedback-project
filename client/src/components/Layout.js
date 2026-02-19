import { Link } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div>
            <nav style={{
                background: "#18181b",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Link to="/" style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold"
                }}>
                    Anonymous Feedback
                </Link>
            </nav>

            <div style={{ padding: "20px" }}>
                {children}
            </div>
        </div>
    );
}

