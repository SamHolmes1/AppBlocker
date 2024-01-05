import ConfirmationButton from "./Form-Components/ConfirmationButton";
import SitesToBlock from "./Form-Components/SItesToBlock";
import SettingsButton from "./Form-Components/SettingsButton";
import UnblockAllSitesButton from "./Form-Components/UnblockAllSitesButton";

const Form = () => {
  return (
    <>
      <div className="form-div">
        <SitesToBlock />
        <SettingsButton />
        <ConfirmationButton />
        <UnblockAllSitesButton />
      </div>
    </>
  );
};

export default Form;
