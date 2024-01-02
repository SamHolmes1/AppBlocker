import DifficultyDropdown from "./DifficultyDropdown";
import PuzzleCard from "./PuzzleCard";

const PuzzleSelector = () => {
    return (
      <div className="puzzle-selector-div">
        <h3>puzzle selector</h3>
        <PuzzleCard />
        <DifficultyDropdown />
      </div>
    );
  };
  
  export default PuzzleSelector;