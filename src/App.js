import logo from "./logo.svg";
import "./App.css";
import TopContent from "./components/TopContent";
import MiddleContent from "./components/MiddleContent";

function App() {
  return (
    <div className="main-content">
      <TopContent />
      <MiddleContent />
    </div>
  );
}

export default App;
