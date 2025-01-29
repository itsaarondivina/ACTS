import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import ListIcon from "@mui/icons-material/List";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

interface UserSessionData {
  fullName: string;
  profilePic: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<UserSessionData | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElChoices, setAnchorElChoices] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const authTokenString = sessionStorage.getItem("user");
    const authToken = authTokenString ? JSON.parse(authTokenString) : null;
    const profilePic = authToken?.profilepicture; // Set default if not available
    const fullName = authToken?.FirstName + authToken?.Lastname || "User";

    // Update state to trigger re-render
    setUser({
      fullName,
      profilePic,
    });
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChoicesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElChoices(event.currentTarget);
  };

  const handleChoicesClose = () => {
    setAnchorElChoices(null);
  };

  const handleLogout = () => {
    handleChoicesClose(); // Close the menu
    sessionStorage.clear();
    localStorage.clear();
    
    // Redirect and force a full page reload
    window.location.href = '/login';
  };

  const openHelpPDF = () => {
    window.open("/FAQ_-_Agent_Call_Tracker_System_(ACTS).pdf", "_blank");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#222", borderColor: "#080808" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ position: "absolute", left: 0, right: 0, textAlign: "center" }}
        >
          <Link
            to="/"
            style={{
              color: "inherit",
              textDecoration: "none",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            <span className="logo-style">A</span>
            <span style={{ color: "#00a8e0" }}>gent </span>
            <span className="logo-style">C</span>
            <span style={{ color: "#00a8e0" }}>all </span>
            <span className="logo-style">T</span>
            <span style={{ color: "#00a8e0" }}>racker </span>
            <span className="logo-style">S</span>
            <span style={{ color: "#00a8e0" }}>ystem</span>
          </Link>
        </Typography>
        <IconButton color="inherit" onClick={handleMenuClick} sx={{ marginLeft: "auto" }}>
          <Typography variant="body1">Tools</Typography>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem component={Link} to="/Support" onClick={handleMenuClose}>
            <a style={{ textDecoration: "none", color: "inherit" }}>Support</a>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a href="/" style={{ textDecoration: "none", color: "inherit" }}>Agent</a>
          </MenuItem>
        </Menu>
        {/* New Menu Button for Choices */}
        <IconButton color="inherit" onClick={handleChoicesClick}>
          <Typography variant="body1">Manage</Typography>
        </IconButton>
        <Menu anchorEl={anchorElChoices} open={Boolean(anchorElChoices)} onClose={handleChoicesClose}>
          <MenuItem component={Link} to="/User" onClick={handleChoicesClose}>
            <PeopleIcon sx={{ marginRight: 1 }} />
            User
          </MenuItem>
          <MenuItem component={Link} to="/ManageLookups" onClick={handleChoicesClose}>
            <ListIcon sx={{ marginRight: 1 }} />
            Lookups
          </MenuItem>
          <MenuItem component={Link} to="/Report" onClick={handleChoicesClose}>
            <LibraryBooksIcon sx={{ marginRight: 1 }} />
            Report
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToAppIcon sx={{ marginRight: 1 }} />
            Logout
          </MenuItem>
        </Menu>
        <IconButton color="inherit" onClick={openHelpPDF}>
          <HelpIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => alert("Help clicked!")}>
          <InfoIcon />
        </IconButton>
        {user && (
          <div style={{ marginLeft: 20 }}>
            <img
              alt="Profile"
              src={user.profilePic}
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
              title={user.fullName}
            />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
