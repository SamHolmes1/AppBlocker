import { useState } from "react";
import QuizQuestions from "./Questions";
import ScoreComponent from "./ScoreComponent";

function PuzzleBox() {
  const [score, setScore] = useState(0);

  if(score !== 5){
  return (
    <div>
      <h1>Quiz App</h1>
      <QuizQuestions score={score} setScore={setScore} />
      <ScoreComponent score={score} />
    </div>
  );
  } else {
    return <h1>You have WON</h1>
  }
}

export default PuzzleBox;
