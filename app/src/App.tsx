import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "components/layout";
import FoodDetails from "food-details/FoodDetails";
import Foods from "foods/Foods";
import NewFood from "new-food/NewFood";

function App() {
  const location = useLocation();
  const { previousLocation } = (location.state ?? {}) as {
    previousLocation: ReturnType<typeof useLocation>;
  };

  return (
    <>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Foods />} />
          <Route path="/new" element={<NewFood />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/food/:id" element={<FoodDetails />} />
        </Routes>
      )}
    </>
  );
}

export default App;
