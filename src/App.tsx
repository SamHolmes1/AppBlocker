import MainPage from "./components/MainPage";
import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Settings from "./components/Settings";
import Quiz from "./components/Quiz";
import Math from "./components/Math";
import { useState, createContext, useEffect } from "react";

export const SettingsContext = createContext({});

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
    ipcRenderer.send("readUserSettingsJson");
  }, []);

  //@ts-ignore
  ipcRenderer.on("userSettingsOutput", (e, data) => {
    setSettingsState(data);
    //@ts-ignore
    ipcRenderer.removeAllListeners("userSettingsOutput");
  });

  return (
    <>
      <Header />
      <Routes>
        {/* <Route
          path="/"
          element={
            <MainPage
              unBlockMode={unBlockMode}
              setUnBlockMode={setUnBlockMode}
            />
          }
        /> */}
        <Route
          path="/settings"
          element={
            <SettingsContext.Provider
              value={{ settingsState, setSettingsState }}
            >
              <Settings />
            </SettingsContext.Provider>
          }
        />
        <Route
          path="/quiz"
          element={<Quiz setUnBlockMode={setUnBlockMode} />}
        />
        <Route path="/" element={<Math />} />
      </Routes>
    </>
  );
}

export default App;
