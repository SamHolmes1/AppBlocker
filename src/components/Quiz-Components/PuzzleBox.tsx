import { useContext, useState } from "react";
import QuizQuestions from "./Questions";
import ScoreComponent from "./ScoreComponent";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { SettingsContext } from "../../App";

interface quizProps {
  setUnBlockMode: Function;
}

function PuzzleBox(props: quizProps) {
  const [score, setScore] = useState(0);
  const {settingsState} = useContext(SettingsContext)

  const clickHandler = () => {
    //@ts-ignore
    props.setUnBlockMode(true);
    // @ts-ignore
    ipcRenderer.invoke("updateSelectedToBlock");
  };

  if (score !== 5) {
    return (
      <div>
        <div className="quiz-div">
        <p className="quiz-instructions">Score 5 correct answers to complete this quiz </p>
        {settingsState.difficulty===5?<p className="quiz-instructions warning">"WARNING: You are in the hardest difficulty setting and need to achieve 5 consecutive answers to complete this quiz"</p> :""}
          <QuizQuestions score={score} setScore={setScore} />
          <ScoreComponent score={score} />
        </div>
        <Link to="/">
          <button className="quiz-home-button"> Home </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="quiz-end">
        <h1 className="well-done">Well done!</h1>
        <Link to="/" onClick={clickHandler}>
          <button className="unlock-button">UNBLOCK</button>
        </Link>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
    );
  }
}

export default PuzzleBox;
