import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../../App";
import { ConfirmationContext } from "../Settings";

const PuzzleCard = () => {
  const gamesArray = ["quiz", "math", "maze"];
  //@ts-ignore
  const { settingsState, setSettingsState } = useContext(SettingsContext);
  const { canConfirm, setCanConfirm } = useContext(ConfirmationContext);
  // const [checkboxProperties, setCheckboxProperties] = useState("");

  useEffect(() => {}, [settingsState]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gameKey = event.target.value;
    setSettingsState((settingsBeforeOnChange: any) => {
      settingsBeforeOnChange[gameKey] = !settingsBeforeOnChange[gameKey];
      return settingsBeforeOnChange;
    });
    if (Object.values(settingsState).includes(true)) {
      setCanConfirm(true);
    } else {
      setCanConfirm(false);
    }
  };

  return (
    <>
      {/* <h3 className="puzzle-card">Puzzle detail here</h3> */}
      <div className="games-checklist">
        {gamesArray.map((game) => {
          return (
            <div key={game} className="individual-quiz-title">
              <input
                id="check-boxes"
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
      </div>
    </>
  );
};

export default PuzzleCard;
