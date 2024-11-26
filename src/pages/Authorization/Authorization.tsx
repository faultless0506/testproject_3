import React, { useState } from "react";
import "./Authorization.scss";
import appleIcon from "../../assets/svg/apple.svg";
import googleIcon from "../../assets/svg/gm.svg";
import facebookIcon from "../../assets/svg/fb.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, register, logout } from "../../store/slices/userSlice";
import profilePhoto from "../../assets/img/photo_2022-01-11_02-38-37.jpg";

const AuthForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };
  const handleLogin = () => {
    dispatch(login({ name: username, email: email }));
  };
  const handleRegister = () => {
    const newUser = { name: username, email: email };
    dispatch(register(newUser));
    setIsRegister(false);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  if (currentUser) {
    return (
      <div className="profile">
        <div className="profile__header">
          <div className="profile_body">
            <img
              className="profile__profile-img"
              src={profilePhoto}
              alt="Profile"
            />
            <h2 className="profile__name">{currentUser.name}</h2>
            <p className="profile__email">{currentUser.email}</p>
          </div>

          <button className="profile__logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="auth-container">
      <div className="auth-header">
        <button
          className={`auth-toggle-button ${isRegister ? "active" : ""}`}
          onClick={handleToggle}
        >
          Log in
        </button>
        <button
          className={`auth-toggle-button ${!isRegister ? "active" : ""}`}
          onClick={handleToggle}
        >
          Sign up
        </button>
      </div>
      <div className="auth-providers">
        <img src={appleIcon} alt="Apple" />
        <img src={googleIcon} alt="Google" />
        <img src={facebookIcon} alt="Facebook" />
      </div>
      <div className="auth-or">
        <span>or</span>
      </div>
      <div className="auth-form">
        <div className="auth-input-group">
          {!isRegister && (
            <>
              <label htmlFor="name">What’s your name?*</label>
              <input
                type="text"
                id="name"
                placeholder="Maximus"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </>
          )}
        </div>
        <div className="auth-input-group">
          <label htmlFor="email">Your Email*</label>
          <input
            type="email"
            id="email"
            placeholder="ivanivanov@gmail.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=" login-register-buttons">
          <button onClick={isRegister ? handleLogin : handleRegister}>
            {isRegister ? "Log in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
