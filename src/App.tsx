import MainPage from "./components/MainPage";
import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Settings from "./components/Settings";
import Quiz from "./components/Quiz";
import { useState, useContext } from "react";
import { SettingsContext } from "./Context/SettingsContext";

function App() {
  const [unBlockMode, setUnBlockMode] = useState(false);
  const SettingsObject = useContext(SettingsContext);
  return (
    <>
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
        <Route
          path="/settings"
          element={
            <SettingsContext.Provider value={SettingsObject}>
              <Settings />
            </SettingsContext.Provider>
          }
        />
        <Route
          path="/quiz"
          element={<Quiz setUnBlockMode={setUnBlockMode} />}
        />
      </Routes>
    </>
  );
}

export default App;
