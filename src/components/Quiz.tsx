import PuzzleBox from "./Quiz-Components/PuzzleBox";
import Maze from "./maze-components/maze";

interface quizProps {
  setUnBlockMode: Function;
}

function Quiz(props: quizProps) {
  return (
    <>
      <div>
        {/* <PuzzleBox setUnBlockMode={props.setUnBlockMode} /> */}
        <Maze setUnBlockMode={props.setUnBlockMode}/>
      </div>
    </>
  );
}

export default Quiz;
