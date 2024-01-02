interface siteProps {
  siteName: string;
}

const SitePreview = (props: siteProps) => {
  return (
    <div className="site-preview-div">
      <h1>{props.siteName}</h1>
    </div>
  );
};

export default SitePreview;
