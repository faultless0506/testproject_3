import "./Header.scss";
import logo from "./../assets/svg/Logo.svg";
import profile from "./../assets/img/Profile.png";
import { useFetchImages } from "../customHooks/useFetchImages";
import { Link } from "react-router-dom";

const listMenu = ["Gallery", "About", "Store"];
export default function Header() {
    const { handleMakeMagic } = useFetchImages();
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="Spans" />
      <div className="header__menu">
        <div className="header__nav">
          {listMenu.map((item, index) => (
            <Link key={index} className="header__nav-item" to="#">
              {item}
            </Link>
          ))}
        </div>
        <img className="header__profile-img" src={profile} alt="Profile" />
        <button className="header__make-magic" onClick={handleMakeMagic}>Make magic</button>
      </div>
    </div>
  );
}
