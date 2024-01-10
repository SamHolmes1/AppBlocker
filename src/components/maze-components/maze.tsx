import { useState, useMemo, useEffect, useContext } from "react";
import { generateMaze, solve } from "./mazeUtil";
import "./styles.scss"
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';
import { SettingsContext } from "../../App";

interface quizProps {
    setUnBlockMode: Function;
  }

export default function Maze(props:quizProps) {
    const {settingsState} = useContext(SettingsContext)
    const [gameId, setGameId] = useState(1);
    const [status, setStatus] = useState("playing");
  
    const [size, setSize] = useState(settingsState.difficulty * 3 +4);
    const [cheatMode, setCheatMode] = useState(false);
  
    const [userPosition, setUserPosition] = useState([0, 0]);
  
    const clickHandler = () => {
        //@ts-ignore
        props.setUnBlockMode(true);
      };

    const maze = useMemo(() => generateMaze(size, size), [size, gameId]);
    const solution = useMemo(() => {
      const s = new Set();
      const solutionPath = solve(maze, userPosition[0], userPosition[1]);
      solutionPath.forEach((path) => {
        const [x, y] = path;
        s.add(String(x) + "-" + String(y));
      });
      return s;
    }, [size, userPosition[0], userPosition[1], gameId]);
  
    useEffect(() => {
      const lastRowIndex = maze.length - 1;
      const lastColIndex = maze[0].length - 1;
      if (userPosition[0] === lastRowIndex && userPosition[1] === lastColIndex) {
        setStatus("won");
      }
    }, [userPosition[0], userPosition[1]]);
  
    const makeClassName = (i, j) => {
      const rows = maze.length;
      const cols = maze[0].length;
      let arr = [];
      if (maze[i][j][0] === 0) {
        arr.push("topWall");
      }
      if (maze[i][j][1] === 0) {
        arr.push("rightWall");
      }
      if (maze[i][j][2] === 0) {
        arr.push("bottomWall");
      }
      if (maze[i][j][3] === 0) {
        arr.push("leftWall");
      }
      if (i === rows - 1 && j === cols - 1) {
        arr.push("destination");
      }
      if (i === userPosition[0] && j === userPosition[1]) {
        arr.push("currentPosition");
      }
  
      if (cheatMode && solution.has(String(i) + "-" + String(j))) {
        arr.push("sol");
      }
      return arr.join(" ");
    };
  
    const handleMove = (e) => {
      e.preventDefault();
      if (status !== "playing") {
        return;
      }
      const key = e.code;
  
      const [i, j] = userPosition;
      if ((key === "ArrowUp" || key === "KeyW") && maze[i][j][0] === 1) {
        setUserPosition([i - 1, j]);
      }
      if ((key === "ArrowRight" || key === "KeyD") && maze[i][j][1] === 1) {
        setUserPosition([i, j + 1]);
      }
      if ((key === "ArrowDown" || key === "KeyS") && maze[i][j][2] === 1) {
        setUserPosition([i + 1, j]);
      }
      if ((key === "ArrowLeft" || key === "KeyA") && maze[i][j][3] === 1) {
        setUserPosition([i, j - 1]);
      }
    };
  
  
    if(status === "playing"){
    return (
      <>
      <div className="maze-div" >
      <div className="maze-puzzle" onKeyDown={handleMove} tabIndex={-1}>
        <p className="puzzle-instructions">CLICK THE MAZE TO BEGIN: Move the red dot to reach the green dot using your arrow keys to move</p>
        {/* <div>
          <label htmlFor="cheatMode">Cheat mode</label>
          <input
            type="checkbox"
            name="cheatMode"
            onChange={(e) => setCheatMode(e.target.checked)}
          />
        </div> */}
  
        <table id="maze">
          <tbody>
            {maze.map((row, i) => (
              <tr key={`row-${i}`}>
                {row.map((cell, j) => (
                  <td key={`cell-${i}-${j}`} className={makeClassName(i, j)}>
                    <div />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <p id="credit-maze">Maze component from https://github.com/tomliangg</p>
      </div>
        <div>
      <Link to="/" ><button className="home-button"> Home </button></Link>
      </div>
      </>
        
  )
  } else return (
    <div>
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
      </div>
    );
  }
