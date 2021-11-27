import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import cookie from "js-cookie";
import { AuthContext } from "../context/auth.js";

const Navbar = () => {
  // const [auth, setAuth]  = useContext(AuthContext)
  const existingTokens = cookie.get("token");
  const existingRole = cookie.get("role");

  const [categorieslist, setCategorieslist] = useState([]);
  const navigate = useNavigate();

  const addCategory = (cat) => {
    console.log(cat);
    let path = `/productslist?subcategory=${cat}`;
    navigate(path);
  };
  const fetchData = async () => {
    const data = await fetch("/admin/categories");
    let json_data = await data.json();
    console.log(json_data.categories);
    setCategorieslist(json_data.categories);
  };
  const logout = () => {
    cookie.remove("token");
    cookie.remove("role");
    let path = `/home`;
    navigate(path);
    // setAuth({"isauth":false,"isadmin":false})
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to={"/"}>
                <a className="nav-link active" href="#">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"}>
                <a className="nav-link" href="#">
                  Register
                </a>
              </Link>
            </li>
            {existingTokens ? (
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={logout}>
                  Logout
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <Link to={"/login"}>
                  <a className="nav-link" href="#">
                    Login
                  </a>
                </Link>
              </li>
            )}

            {
              existingTokens && existingRole==='admin' ? (
                <li className="nav-item">
                  <Link to={"/categories"}>
                    <a className="nav-link" href="#">
                      Admin panel
                    </a>
                  </Link>
                </li>
              ) : (
                <div> </div>
              )
            }

            <li className="nav-item">
              <Link to={"/cart"}>
                <i class="fas fa-shopping-cart"></i>
                <span></span>
              </Link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                // href="http://example.com"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {categorieslist.map((element, index) => (
                  <div className="form-inline" key={index}>
                    {/* <Link to={"/productlist/"}> */}
                    <li class="dropdown-submenu">
                      <a
                        class="dropdown-item dropdown-toggle"
                        data-toggle="dropdown"
                        href="#"
                      >
                        {element.name}
                      </a>

                      {element.Subcategories.map((subelement, index) => (
                        <div className="form-inline" key={index}>
                          {/* <Link to={"/productlist/"}> */}
                          <ul class="dropdown-menu">
                            <a
                              class="dropdown-item"
                              href=""
                              onClick={() => addCategory(subelement.id)}
                            >
                              {subelement.name}
                            </a>
                          </ul>
                          {/* </Link> */}
                        </div>
                      ))}
                    </li>
                    {/* </Link> */}
                  </div>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <a href="" className="welcome">Welcome : {existingRole}</a>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
