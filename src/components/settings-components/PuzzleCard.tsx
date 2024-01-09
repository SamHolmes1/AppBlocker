import { useContext, useState } from "react";
import { SettingsContext } from "../../Context/SettingsContext";

const PuzzleCard = () => {
  const gamesArray = ["quiz", "math", "maze"];
  const SettingsObject = useContext(SettingsContext);
  // const [checkboxProperties, setCheckboxProperties] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gameKey = event.target.value;
    SettingsObject[`${gameKey}_selected`] =
      !SettingsObject[`${gameKey}_selected`];
    
  };

  return (
    <>
      <h3 className="puzzle-card">Puzzle detail here</h3>
      {gamesArray.map((game) => {
        return (
          <div key={game}>
            <input
              type="checkbox"
              value={`${game}_selected`}
              name={game}
              checked={SettingsObject[`${game}_selected`]}
              onChange={(event) => {
                handleOnChange(event);
              }}
            />
            <label htmlFor={game}>{game}</label>
          </div>
        );
      })}
    </>
  );
};

export default PuzzleCard;
