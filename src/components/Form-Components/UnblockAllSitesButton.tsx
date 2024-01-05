import { Link } from "react-router-dom";

const UnblockAllSitesButton = () => {

    // const clickHandler = () => {
    //   const { ipcRenderer } = window.require('electron');
    //   ipcRenderer.send("updateHosts") 
    //  }
  
    return (
      <Link to="/quiz"><button className="unblock-all-button" >Unblock All Sites</button></Link>
    );
  };
  
  export default UnblockAllSitesButton;
  