import ConfirmationButton from "./Form-Components/ConfirmationButton";
import SitesToBlock from "./Form-Components/SItesToBlock";
import SettingsButton from "./Form-Components/SettingsButton";

const Form = () => {
  return (
    <>
      <div className="form-div">
        <SitesToBlock />
        <SettingsButton />
        <ConfirmationButton />
      </div>
    </>
  );
};

export default Form;
