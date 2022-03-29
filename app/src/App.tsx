import { Routes, Route } from "react-router-dom";
import Foods from "./foods/Foods";
import NewFood from "./new-food/NewFood";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Foods />} />
      <Route path="/new" element={<NewFood />} />
      <Route path="/example" element={<h1>Example Route</h1>} />
    </Routes>
  );
}

export default App;
