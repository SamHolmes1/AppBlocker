
/**
 * Renders a button that when pressed, triggers an ipcMain Event to update the hosts file.
 * This will ask the user for admin privileges
 * @returns JSX.Element
 */
interface confirmationButtonProps {
  setUnBlockMode: Function;
  setWrittenToBlocklist: Function;
  unBlockMode: boolean;
}

const ConfirmationButton = (props: confirmationButtonProps) => {
  const clickHandler = () => {
    //@ts-ignore
    ipcRenderer.send("updateHosts");
    props.setUnBlockMode(false);
  };

  ipcRenderer.on("writtenToBlockList", () => {
    props.setWrittenToBlocklist(true)})
  

  return (
    <button className="confirmation-button-div" onClick={clickHandler}>
      {props.unBlockMode === true ? "Unblock!" : "Block!"}
    </button>
  );
};

export default ConfirmationButton;
