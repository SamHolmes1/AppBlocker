import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-div">
      <Link to="/">
        <h1>App Blocker</h1>
      </Link>
    </div>
  );
};

export default Header;
