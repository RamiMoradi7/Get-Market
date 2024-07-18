import { LogoutRounded } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./AuthMenu.css";

function AuthMenu() {
  const user = useSelector<AppState, UserModel>((appState) => appState.user);

  function logOut(): void {
    notify.success(`Hope to see you back ${user.firstName}`);
    authService.logOut();
  }

  return (
    <div className="AuthMenu">
      {user ? (
        <div className="user-info">
          <Typography variant="body1">
            Hello, {user.firstName} {user.lastName}
          </Typography>
          <IconButton
            className="menu-icon"
            size="small"
            aria-label="logout-menu"
            onClick={logOut}
          >
            <LogoutRounded />
          </IconButton>
        </div>
      ) : (
        <div className="guest-info">
          <Typography variant="body1">Hello, Guest</Typography>
          <NavLink className="NavLink" to="/login">
            <Typography variant="body1">Login</Typography>
          </NavLink>
          <NavLink className="NavLink" to="/register">
            <Typography variant="body1">Register</Typography>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default AuthMenu;
