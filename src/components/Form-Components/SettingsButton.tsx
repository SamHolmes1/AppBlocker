import { Link } from "react-router-dom";

const SettingsButton = () => {
  return (
    <Link to="/settings">
      <button className="settings-button-div">Settings Button</button>
    </Link>
  );
};

export default SettingsButton;
