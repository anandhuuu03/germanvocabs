import { Routes, Route } from "react-router-dom";
import MainPage from "./mainpage/MainPage";
import GrammarPage from "./grammar/GrammarPage";
import BasicsPage from "./basics/BasicsPage"; 
import TopicsPage from "./topics/TopicsPage";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Change this path from "/germanvocabs" to "/" */}
        <Route path="/" element={<MainPage />} />
        <Route path="/grammar" element={<GrammarPage />} />
        <Route path="/basics" element={<BasicsPage />} />
        <Route path="/topics" element={<TopicsPage />} />
      </Routes>
    </div>
  );
}

export default App;