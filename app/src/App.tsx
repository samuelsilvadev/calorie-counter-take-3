import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "components/layout";
import FoodDetails from "food-details/FoodDetails";
import Foods from "foods/Foods";
import NewFood from "new-food/NewFood";
import { useQuery } from "react-query";

type TUser = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
};

type TFilteredUserResponse = {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  totalCount: number;
  data: [TUser];
};

export function getUser(): Promise<TFilteredUserResponse> {
  return fetch(
    process.env.REACT_APP_API_URL +
      "/users?email=" +
      process.env.REACT_APP_DEFAULT_USER_EMAIL
  ).then((response) => response.json());
}

function App() {
  const location = useLocation();
  const { previousLocation } = (location.state ?? {}) as {
    previousLocation: ReturnType<typeof useLocation>;
  };
  useQuery("user", getUser);

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
