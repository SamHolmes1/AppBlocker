import { Link } from "react-router-dom";

/**
 * Renders a button component that when pressed, Uses a <Link> tag to send the user to the quiz page.
 * @returns JSX.Element
 */

interface unBlockProps {
  unBlockMode: boolean;
}

const UnblockModeButton = (props: unBlockProps) => {
  return (
    <Link to="/quiz">
      <button  disabled={props.unBlockMode} className="unblock-all-button">Unblock Mode</button>
    </Link>
  );
};

export default UnblockModeButton;
