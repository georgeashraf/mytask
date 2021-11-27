import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import cookie from "js-cookie";


const Sidebar = () => {
  let location = useLocation();
  const existingTokens = cookie.get("token");
  const existingRole = cookie.get("role");
  if (location.pathname.match(/home/) || existingRole==='user' || existingRole===undefined ){
    return null;
  }
  return (
    <div className="sidebar side-bar" >
      <ul>
        <li>
          <Link to={"/users/"}>
            <a href="">Users</a>
          </Link>
        </li>
        <li>
          <Link to={"/categories/"}>
            <a href="">Categories</a>
          </Link>
        </li>
        <li>
          <Link to={"/products/"}>
            <a href="">Products</a>
          </Link>
        </li>
        <li>
          <Link to={"/tags/"}>
            <a href="">Tags</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
