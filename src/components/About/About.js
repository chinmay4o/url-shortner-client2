import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./about.css";
import { useSelector, useDispatch } from "react-redux";
import { rootUser1 } from "../../actions/index.js";
import about from "../images/about.svg";

const About = ({ userData, setUserData, data1 }) => {
  const history = useHistory();

  //redux mystate
  const rootUser = useSelector((state) => state.changeUser);
  const dispatch = useDispatch();
  //authenticate
  async function auth1() {
    try {
      const res = await fetch("https://urlshortner4o2.herokuapp.com/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUserData({ ...data });
      dispatch(rootUser1(data));
      console.log(userData);
      console.log(data1);

      if (res.status !== 200) {
        alert("unauthrised: Login to visit your account")
        const error = new Error(res.error);
        throw error;
      } else {
        console.log("auth from about");
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  }

  //print user url_shortner
  function printUserUrls(ele, index) {
    return (
      <li key={index} className="div3 mt-2">
        Long Url ={" "}
        <span className="linkColour">
          {" "}
          <a href={ele.longUrl} rel="noopener noreferrer" target="_blank">
            {ele.longUrl}
          </a>{" "}
        </span>
        <br />
        Short Url ={" "}
        <span className="linkColour">
          {" "}
          <a href={ele.shorten} rel="noopener noreferrer" target="_blank">
            {ele.shorten}
          </a>{" "}
        </span>
      </li>
    );
  }

  useEffect(() => {
    auth1();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!userData.email) {
    return (
      <div className="dashboard-parent">
        {" "}
        <h1 className="fw-bold">Loading...</h1>{" "}
      </div>
    );
  } else {
    return (
      <div className="about-parent">
        <div className="about">
          <div className="about-div1">
            {console.log(rootUser)}
            <h3>Welcome {rootUser ? rootUser.name : <h2> Loading...</h2>}</h3>
            <div className="row about-links">
              <ol className="col-12 ">
                <h6 className="fw-bold fs-5">Find your previous urls here</h6>
                {rootUser.myUrls
                  ? rootUser.myUrls.map(printUserUrls)
                  : "No URLs available"}
              </ol>
            </div>
          </div>

          <div className="about-div2">
            <img src={about} alt="hero" />
          </div>
        </div>
      </div>
    );
  }
};

export default About;
