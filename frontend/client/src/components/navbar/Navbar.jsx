import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaBookOpen } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/signin");
  };
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <b>
            <FaBookOpen /> &nbsp; Student-Task-Manager
          </b>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item mx-2">
              <Link className="nav-link active btn-nav" to="/">Home</Link>
            </li>

            <li className="nav-item mx-2">
              <Link className="nav-link active btn-nav" to="/about">About Us</Link>
            </li>
        
            {isLoggedIn && (
              <>
              <li className="nav-item mx-2">
               <Link className="nav-link  active btn-nav" to="/todo">Add task
               </Link>
               </li>
               <li className="nav-item mx-2">
                  <button className="nav-link active btn-nav"
                   onClick={handleLogout}
                   style={{background: "none", border:"none"}}>
                   Log Out
                 </button>
               </li>
              </>
            )}
            {!isLoggedIn && (
              <>
               <li className="nav-item mx-2">
                 <Link className="nav-link  active btn-nav" to="/signup">Sign Up
                 </Link>
               </li>
               <li className="nav-item mx-2">
                 <Link className="nav-link active btn-nav" to="/signin">Sign In</Link>
               </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
