import "bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"

function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await api.post("/auth/register", {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            });

            setError("");
            navigate("/")
        } catch (err) {
            console.error("Register error:", err);
            setError("Registration failed");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div
                className="card p-4 shadow"
                style={{ width: "100%", maxWidth: "400px" }}
            >
                <h2 className="text-center mb-4"><b>Register</b></h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email here"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password here"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="repeatPassword" className="form-label">
                            Repeat Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="repeatPassword"
                            placeholder="Repeat your password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-dark w-100 mb-3">
                        Register
                    </button>

                    <div className="text-center">
                        <small className="text-decoration-underline">
                            Already have an account? <Link to="/" className="text-black">Log In</Link>
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;