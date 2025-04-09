import "bootstrap";
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div
                className="card p-4 shadow"
                style={{ width: "100%", maxWidth: "400px" }}
            >
                <h2 className="text-center mb-4"><b>Register</b></h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email here"
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