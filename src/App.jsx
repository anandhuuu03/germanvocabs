import { Routes, Route } from "react-router-dom";
import MainPage from "./mainpage/MainPage";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;