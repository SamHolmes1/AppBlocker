import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-div">
      <Link className="header-text" to="/">
        <h1 >Lockout Labrynth</h1>
      </Link>
    </div>
  );
};

export default Header;
