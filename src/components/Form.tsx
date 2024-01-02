import ConfirmationButton from "./Form-Components/ConfirmationButton";
import InputBox from "./Form-Components/InputBox";
import SitesToBlock from "./Form-Components/SItesToBlock";
import SettingsButton from "./Form-Components/SettingsButton";

const Form = () => {
  return (
    <>
      <div className="form-div">
        <SitesToBlock />
        <button className="add-button-div">Form Button</button>
        <SettingsButton />
        <ConfirmationButton />
      </div>
    </>
  );
};

export default Form;
