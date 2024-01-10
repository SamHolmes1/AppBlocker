import PuzzleBox from "./Quiz-Components/PuzzleBox";
import Maze from "./maze-components/maze";
import MathsPuzzle from "./MathsPuzzle";
import { SettingsContext } from "../App";
import { useContext } from "react";

interface quizProps {
  setUnBlockMode: Function;
}

function Quiz(props: quizProps) {
const {settingsState} = useContext(SettingsContext)

const selectedPuzzles = []

for (let i = 0; i < Object.keys(settingsState).length; i++) {
if (settingsState[Object.keys(settingsState)[i]] === true ) {
  
  const slicedKey = Object.keys(settingsState)[i].slice(0, 4)
  selectedPuzzles.push(slicedKey)
}

}
const randomIndex = Math.floor(Math.random()*selectedPuzzles.length)


  return (
    <>
      <div>
        {selectedPuzzles[randomIndex] === "quiz" ? <PuzzleBox setUnBlockMode={props.setUnBlockMode}/> : <></>}
        {selectedPuzzles[randomIndex] === "maze" ? <Maze setUnBlockMode={props.setUnBlockMode}/> : <></>}
        {selectedPuzzles[randomIndex] === "math" ? <MathsPuzzle setUnBlockMode={props.setUnBlockMode}/> : <></>}
      </div>
    </>
  );
}

export default Quiz;
