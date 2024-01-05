import Form from "./components/Form";
import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Settings from "./components/Settings";
import Quiz from "./components/Quiz";

function App() {
  return (
    <>
      <Header />
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
    </>
  );
}

export default App;
