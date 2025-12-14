import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import AppRouter from "./components/AppRouter";
import { logout, restoreUser } from "./store/slices/user.slice";
import { userSelectors } from "./store/selectors/user.selectors";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isInRoom = location.pathname.startsWith("/room/");
  const isAuthenticated = useSelector(userSelectors.isAuth);
  const username = useSelector(userSelectors.username);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    dispatch(restoreUser(token));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app">
      {isAuthenticated && (
        <header className="app-header">
          {isInRoom && (
            <Link to="/" className="back-btn">
              ← Back
            </Link>
          )}
          <Link to="/" className="logo">
            ChatApp
          </Link>
          <div className="header-right">
            <span className="header-username">{username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
      )}
      <AppRouter />
    </div>
  );
}

export default App;
