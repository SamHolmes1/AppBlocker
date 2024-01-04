interface siteProps {
  siteName: string;
  URL: string;
  logoUrl: string;
  isActive: boolean;
}

const SitePreview = (props: siteProps) => {

  const addToList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.electronAPI.writeToBlockList(props.siteName, props.URL, props.logoUrl)
  }

  const changeBlockStatus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.electronAPI.writeToBlockList(props.siteName, props.URL, props.logoUrl, true);
  }

  if(props.isActive){
  return (
    <div className="site-preview-div">
      <button onClick={changeBlockStatus}><h1>{props.siteName}</h1></button>
    </div>
  );
  } 
  else {
    return (
      <div className="site-preview-div">
        <button onClick={addToList}><h1>{props.siteName}</h1></button>
      </div>
    );
  }
};

export default SitePreview;
