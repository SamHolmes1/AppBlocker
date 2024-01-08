import { useState } from "react";
import QuizQuestions from "./Questions";
import ScoreComponent from "./ScoreComponent";
import { Link } from "react-router-dom";

interface quizProps {
  setUnBlockMode: Function;
}

function PuzzleBox(props: quizProps) {
  const [score, setScore] = useState(0);

  const clickHandler = () => {
    //@ts-ignore
    props.setUnBlockMode(true);
  };

  if (score !== 5) {
    return (
      <div className="quiz-div">
        <QuizQuestions score={score} setScore={setScore} />
        <ScoreComponent score={score} />
      </div>
    );
  } else {
    return (
      <>
        <h1>Well done</h1>
        <Link to="/" onClick={clickHandler}>
          <button>Unblock now</button>
        </Link>
      </>
    );
  }
}

export default PuzzleBox;
