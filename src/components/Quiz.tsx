import PuzzleBox from "./Quiz-Components/PuzzleBox";

interface quizProps {
  setUnBlockMode: Function;
}

function Quiz(props: quizProps) {
  return (
    <>
      <div>
        <PuzzleBox setUnBlockMode={props.setUnBlockMode} />
      </div>
    </>
  );
}

export default Quiz;
