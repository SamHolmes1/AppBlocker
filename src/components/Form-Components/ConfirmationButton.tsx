const ConfirmationButton = () => {
  const clickHandler = () => {
    ipcRenderer.send("updateHosts");
  };

  return (
    <button className="confirmation-button-div" onClick={clickHandler}>
      Confirmation Button
    </button>
  );
};

export default ConfirmationButton;
