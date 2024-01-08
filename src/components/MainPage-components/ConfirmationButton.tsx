/**
 * Renders a button that when pressed, triggers an ipcMain Event to update the hosts file.
 * This will ask the user for admin privileges
 * @returns JSX.Element
 */
interface confirmationButtonProps {
  setUnBlockMode: Function;
  setWrittenToBlocklist: Function;
}

const ConfirmationButton = (props: confirmationButtonProps) => {
  const clickHandler = () => {
    //@ts-ignore
    ipcRenderer.send("updateHosts");
    setTimeout(props.setWrittenToBlocklist, 5000, true);
    props.setUnBlockMode(false);
  };

  return (
    <button className="confirmation-button-div" onClick={clickHandler}>
      Block Sites
    </button>
  );
};

export default ConfirmationButton;
