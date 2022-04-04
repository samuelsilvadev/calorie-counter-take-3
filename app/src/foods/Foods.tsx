import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { Food } from "../types/Food";
import FoodsWrapper from "./components/foods-wrapper";

function getAllFoods() {
  return fetch(process.env.REACT_APP_API_URL + "/foods").then((response) =>
    response.json()
  );
}

export type TAllFoodsResponse = {
  data: Food[];
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
  totalCount: number;
};

function Foods() {
  const location = useLocation();
  const { isLoading, data, error } = useQuery<TAllFoodsResponse>(
    "foods",
    getAllFoods
  );
  const foods = data?.data ?? [];

  if (isLoading) {
    return (
      <FoodsWrapper>
        <p>Loading...</p>
      </FoodsWrapper>
    );
  }

  if (error) {
    return (
      <FoodsWrapper>
        <p>Something went wrong, please try again later.</p>
      </FoodsWrapper>
    );
  }

  if (foods.length === 0) {
    return (
      <FoodsWrapper>
        <p>No foods to display</p>
      </FoodsWrapper>
    );
  }

  return (
    <FoodsWrapper>
      <ul>
        {foods.map(
          ({ id, name, portionDisplayName, portionAmount, calories }) => (
            <li key={id} className="mb-4">
              <article className="grid grid-cols-2">
                <h2 className="col-start-1">{name}</h2>
                <h3 className="col-start-1">
                  {portionAmount} {portionDisplayName} has {calories} calories
                </h3>
                <Link
                  className="col-start-2 row-start-1 row-end-3 flex items-center justify-self-end shadow bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4"
                  to={`/food/${id}`}
                  state={{ previousLocation: location }}
                >
                  View details
                </Link>
              </article>
            </li>
          )
        )}
      </ul>
    </FoodsWrapper>
  );
}

export default Foods;
