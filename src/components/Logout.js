import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  async function logoutUser(e) {
    e.preventDefault();
    const response = await fetch(
      "https://urlshortner4o2.herokuapp.com/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      }
    );

    console.log("chinmay");

    if (response.status !== 200) {
      return console.log("OOPS unable to logout");
    } else {
      return history.push("/login");
    }
  }

  return (
    <div className="ms-3">
      <button className="btn btn-primary" onClick={(e) => logoutUser(e)}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
