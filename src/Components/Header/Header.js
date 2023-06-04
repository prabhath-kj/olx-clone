import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/FirebaseStore";
import { signOut, getAuth } from "firebase/auth";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";

function Header() {
  const { name, setUser } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser("");
        navigate("/");
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/">
            <OlxLogo />
          </Link>
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="loginPage">
          {name ? (
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/Logout"
            >
              <span onClick={handleLogout}>{name?.displayName} Logout</span>
            </Link>
          ) : (
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to="/Login"
            >
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>
        <div className="sellMenu">
          <SellButton />
          <Link to="/Create">
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
