import React, { useState } from "react";
import "./Login.css";
import logo from "../../Assets/LOGO.png";
import BackGround from "../../Assets/BackGround.png";
import { useLogin } from "../../Shared/Hooks/UseLogin";

export const Login = ({ switchAuthHandler }) => {
  const { isLodaing, login } = useLogin();
  const [formData, setFormData] = useState({
    email: {
      value: "",
    },
    password: {
      value: "",
    },
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value,
      },
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(formData.email.value, formData.password.value);
  };

  return (
    <>
      <div className="login-esfera">
        <img
          style={{ height: "15em" }}
          src="https://portal.wol.group/firmas/odd/esfera.gif"
        />
      </div>

      <div className="login-card">
        <div className="login-content">
          <span style={{ fontSize: "5vh", fontWeight:'bold'}}>AWS INVENTORY</span>
          <form
            onSubmit={handleLogin}
            style={{ display: "grid", gridTemplateColumns: "1fr" }}
          >
            <span style={{ textAlign: "initial", fontWeight:'bold'}}>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email.value}
              onChange={onChangeValue}
              className="text-input"
            />
            <span style={{ textAlign: "initial", fontWeight:'bold'}}>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password.value}
              onChange={onChangeValue}
              className="text-input"
            />
            <input
              className="text-input"
              style={{ marginTop: "10vh", color:'white', border:'2px solid black'}}
              type="submit"
              value="LOGIN"
            />
          </form>
        </div>
      </div>
      <div className="logos">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img className="logo-img" src={logo} style={{ height: "5em" }} />
        </div>
      </div>
    </>
  );
};
