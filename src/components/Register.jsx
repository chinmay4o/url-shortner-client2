import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  //usehistory
  const history = useHistory();

  // onclick handler
  async function registerUser(e) {
    e.preventDefault();
    var tester =
      /^[-!#$%&'*+0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!info.email || !info.password) {
      return alert("Please fill in the details");
    } else if (!tester.test(info.email)) {
      return alert("Please provide valid email address");
    } else if (info.password.length < 6) {
      return alert("password must be 6 characters long");
    } else {
      const response = await fetch(
        "https://urlshortner4o2.herokuapp.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info),
        }
      );

      if (response.status !== 200) {
        const err = await response.json();
        console.log(err.message);
      } else {
        console.log("success registerUser");
        history.push("/login");
      }
    }
  }

  return (
    <div className="parent">
      <div className="container shadow p-5 form1">
        <h2 className="mb-5">Register Here</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn1"
            onClick={registerUser}
          >
            Register
          </button>
        </form>

        <p className="link1">
          {" "}
          <Link to="/login">Already have an account ?</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
