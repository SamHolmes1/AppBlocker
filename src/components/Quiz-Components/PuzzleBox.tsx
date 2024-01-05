import { useState } from "react";
import QuizQuestions from "./Questions";
import ScoreComponent from "./ScoreComponent";
import { Link } from "react-router-dom";

function PuzzleBox() {
  const [score, setScore] = useState(0);

  const clickHandler = () => {
    ipcRenderer.send("updateHosts", true);
  };

  if(score !== 5){
  return (
    <div>
      <h1>Quiz App</h1>
      <QuizQuestions score={score} setScore={setScore} />
      <ScoreComponent score={score} />
    </div>
  );
  } else {
    return (
    <>
    <h1>Well done</h1>
    <Link to="/" onClick={clickHandler}><button>Unblock now</button></Link>
    </>
    )
  }
}

export default PuzzleBox;
