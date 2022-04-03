import { Routes, Route } from "react-router-dom";
import Foods from "./foods/Foods";
import NewFood from "./new-food/NewFood";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Foods />} />
      <Route path="/new" element={<NewFood />} />
    </Routes>
  );
}

export default App;
