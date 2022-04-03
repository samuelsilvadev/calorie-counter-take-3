import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import Foods from "./foods/Foods";
import NewFood from "./new-food/NewFood";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Foods />} />
        <Route path="/new" element={<NewFood />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
