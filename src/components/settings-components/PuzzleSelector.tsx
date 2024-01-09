import DifficultyDropdown from "./DifficultyDropdown";
import PuzzleCard from "./PuzzleCard";

const PuzzleSelector = () => {
  return (
    <div className="puzzle-selector-div">
      <h3 className="puzzle-selector-title">Select the puzzles you'd like to see:</h3>
      <PuzzleCard />
      <DifficultyDropdown />
    </div>
  );
};

export default PuzzleSelector;
