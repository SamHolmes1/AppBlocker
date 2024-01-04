interface siteProps {
  siteName: string;
  URL: string;
  logoUrl: string;
  isActive: boolean;
}

const SitePreview = (props: siteProps) => {

  const addToList = () => {
    
  }

  const changeBlockStatus = () => {

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
