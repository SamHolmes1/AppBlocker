import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../../App";

const PuzzleCard = () => {
  const gamesArray = ["quiz", "math", "maze"];
  const { settingsState, setSettingsState } = useContext(SettingsContext);
  // const [checkboxProperties, setCheckboxProperties] = useState("");

  useEffect(() => {
    
  }, [settingsState])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gameKey = event.target.value;
    setSettingsState((settingsBeforeOnChange) => {
      settingsBeforeOnChange[gameKey] =
        !settingsBeforeOnChange[gameKey];
      return settingsBeforeOnChange;
    });
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
              defaultChecked={settingsState[`${game}_selected`]}
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
