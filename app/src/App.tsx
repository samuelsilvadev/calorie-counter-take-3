import { Routes, Route } from "react-router-dom";
import Foods from "./foods/Foods";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Foods />} />
      <Route path="/example" element={<h1>Example Route</h1>} />
    </Routes>
  );
}

export default App;
