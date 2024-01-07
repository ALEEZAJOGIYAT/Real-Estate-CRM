import React from "react";
import loginPic from "../../../assets/images/loginPage.png";
import "./style.css";
import logo from "../../../assets/images/v-lookin-logo.png";
import { LoginForm } from "./form";

export const Login = (props) => {

  return (
    <div className="main_body">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="main_body_container">
        <div className="main_body_content">
          <div className="loginPic">
            <img src={loginPic} />
          </div>
          <div className="login_form">
            <div className="login_form_heading">
              <h2>{props.loginHeading}</h2>
            </div>
                <div className="login_form_inputs">
                  <LoginForm name="Login" />
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};
