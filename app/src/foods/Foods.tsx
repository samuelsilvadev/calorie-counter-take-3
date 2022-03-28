import { useQuery } from "react-query";

function getAllFoods() {
  return fetch(process.env.REACT_APP_API_URL + "/foods").then((response) =>
    response.json()
  );
}

function Foods() {
  const { isLoading } = useQuery("foods", getAllFoods);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <h1>Foods</h1>;
}

export default Foods;
