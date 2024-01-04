const ConfirmationButton = () => {

  const clickHandler = () => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.send("updateHosts") 
   }

  return (
    <button className="confirmation-button-div" onClick={clickHandler}>Confirmation Button</button>
  );
};

export default ConfirmationButton;
