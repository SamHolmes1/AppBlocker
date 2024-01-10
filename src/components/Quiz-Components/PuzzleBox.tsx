import { useState } from "react";
import QuizQuestions from "./Questions";
import ScoreComponent from "./ScoreComponent";
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';


interface quizProps {
  setUnBlockMode: Function;
}

function PuzzleBox(props: quizProps) {
  const [score, setScore] = useState(0);

  const clickHandler = () => {
    //@ts-ignore
    props.setUnBlockMode(true);
    // @ts-ignore
    ipcRenderer.send("updateSelectedToBlock")
  };

  if (score !== 5) {
    return (
      <div>
      <div className="quiz-div">
        <QuizQuestions score={score} setScore={setScore} />
        <ScoreComponent score={score} />
      </div>
      <Link to="/" ><button className="home-button"> Home </button></Link>
      </div>
    );
  } else {
    return (
      <div className= "quiz-end">
        <h1 className="well-done">Well done!</h1>
        <Link to="/" onClick={clickHandler}>
          <button className="unlock-button">UNBLOCK</button>
        </Link>
        <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />
      </div>
    );
  }
}

export default PuzzleBox;
