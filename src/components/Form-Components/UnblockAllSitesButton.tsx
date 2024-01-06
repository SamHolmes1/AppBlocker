import { Link } from "react-router-dom";

const UnblockAllSitesButton = () => {
  return (
    <Link to="/quiz">
      <button className="unblock-all-button">Unblock All Sites</button>
    </Link>
  );
};

export default UnblockAllSitesButton;
