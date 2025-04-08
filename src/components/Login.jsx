import "bootstrap";

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4"><b>Log In</b></h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter you email here"
            />
          </div>
          <div className="mb-2">
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
          <div className="text-start mb-3 mt-4">
            <a href="#" className="text-decoration-underline text-black">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-3">
            Log In
          </button>
          <div className="text-center">
            <small className="text-decoration-underline">Don't have an account? <a href='#'className="text-black">Register</a></small>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
