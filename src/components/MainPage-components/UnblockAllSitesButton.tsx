import { Link } from "react-router-dom";

/**
 * Renders a button component that when pressed, Uses a <Link> tag to send the user to the quiz page.
 * @returns JSX.Element
 */

const UnblockAllSitesButton = () => {
  return (
    <Link to="/quiz">
      <button className="unblock-all-button">Unblock All Sites</button>
    </Link>
  );
};

export default UnblockAllSitesButton;
