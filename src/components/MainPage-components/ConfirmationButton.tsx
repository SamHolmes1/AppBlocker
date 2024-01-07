/**
 * Renders a button that when pressed, triggers an ipcMain Event to update the hosts file.
 * This will ask the user for admin privileges
 * @returns JSX.Element
 */
const ConfirmationButton = () => {
  const clickHandler = () => {
    //@ts-ignore
    ipcRenderer.send("updateHosts");
  };

  return (
    <button className="confirmation-button-div" onClick={clickHandler}>
      Confirmation Button
    </button>
  );
};

export default ConfirmationButton;
