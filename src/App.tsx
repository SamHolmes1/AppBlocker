import MainPage from "./components/MainPage";
import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Settings from "./components/Settings";
import Quiz from "./components/Quiz";
import MathsPuzzle from "./components/MathsPuzzle";
import { useState, createContext, useEffect } from "react";

export const SettingsContext = createContext({});

//Path names in quiz will have to be changed as they currently link to quiz

function App() {
  const [unBlockMode, setUnBlockMode] = useState(false);
  const [settingsState, setSettingsState] = useState({
    difficulty: 1,
    quiz_selected: true,
    math_selected: true,
    maze_selected: true,
  });

  useEffect(() => {
    //@ts-ignore
    ipcRenderer.invoke("readUserSettingsJson");
  }, []);

  //@ts-ignore
  ipcRenderer.once("userSettingsOutput", (e, data) => {
    setSettingsState(data);
    //@ts-ignore
    ipcRenderer.removeAllListeners("userSettingsOutput");
  });

  return (
    <>
      <SettingsContext.Provider value={{ settingsState, setSettingsState }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                unBlockMode={unBlockMode}
                setUnBlockMode={setUnBlockMode}
              />
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/quiz"
            element={<Quiz setUnBlockMode={setUnBlockMode} />}
          />
        </Routes>
      </SettingsContext.Provider>
    </>
  );
}

export default App;
