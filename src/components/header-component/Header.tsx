import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import "./Header.css";

const Header = () => {
  return (
    <>
      <header>
        <h2>My Flashcards - Learn Anything</h2>
        <nav className="container">
          <ul>
            <li>
              <a href="#">
                <HomeRoundedIcon />
                HOME
              </a>
            </li>
            <li>
              <a href="#">
                <AutoStoriesRoundedIcon />
                LIBRARY
              </a>
            </li>
            <li>
              <a href="#">
                <SettingsRoundedIcon />
                SETTINGS
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
