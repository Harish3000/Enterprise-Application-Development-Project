import React from "react";

function Register() {
  return (
    <div className="loginForm">
      <div className="loginTitle">Register</div>
      <form>
        <div class="row g-3 mb-2 mt-2">
          <div class="col">
            <label for="exampleInputUsername" className="form-label">
              User Name
            </label>
            <input type="text" class="form-control" aria-label="Username" />
          </div>
          <div class="col">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputAddress" className="form-label">
            Address
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlAddress"
            rows="3"
          />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
