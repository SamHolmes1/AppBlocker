import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
    <div className="header-div">
    <img className="header-logo" src="src/assets/labyrinth.ico"></img>
      <Link className="header-text" to="/">
        <h1 >Lockout Labyrinth</h1>
      </Link>
    </div>
    </div>
  );
};

export default Header;
