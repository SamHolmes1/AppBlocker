import { Link } from "react-router-dom";
/**
 * Renders a button component that when pressed, Uses a <Link> tag to send the user to the settings page.
 * @returns JSX.Element
 */
const SettingsButton = () => {
  return (
    <Link to="/settings">
      <button className="settings-button-div">Settings</button>
    </Link>
  );
};

export default SettingsButton;
