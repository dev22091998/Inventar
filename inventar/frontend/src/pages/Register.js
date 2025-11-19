import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    await API.post("/user/register", {
      username: name,
      password: password,
    });

    alert("Register successful");
    setName("");
    setPassword("");
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed!");
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">Register</h3>

          <form onSubmit={submitHandler}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
