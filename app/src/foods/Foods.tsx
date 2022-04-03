import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function getAllFoods() {
  return fetch(process.env.REACT_APP_API_URL + "/foods").then((response) =>
    response.json()
  );
}

type Food = {
  addedSugars: number;
  alcohol: number;
  calories: number;
  darkGreenVegetables: number;
  dryBeansPeas: number;
  factor: number;
  fruits: number;
  grains: number;
  id: string;
  increment: number;
  meats: number;
  milk: number;
  multiplier: number;
  name: string;
  oils: number;
  orangeVegetables: number;
  otherVegetables: number;
  portion: number;
  portionAmount: number;
  portionDisplayName: string;
  saturatedFats: number;
  solidFats: number;
  soy: number;
  starchyVegetables: number;
  vegetables: number;
  wholeGrains: number;
};

type TAllFoodsResponse = {
  data: Food[];
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
  totalCount: number;
};

function Foods() {
  const { isLoading, data } = useQuery<TAllFoodsResponse>("foods", getAllFoods);
  const foods = data?.data ?? [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="w-full max-w-lg px-8 m-auto">
      <h1 className="text-3xl font-bold underline mb-12">Foods</h1>
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
                  className="col-start-2 row-start-1 row-end-3 flex items-center justify-self-end shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline text-white font-bold py-2 px-4"
                  to={`/`}
                >
                  View details
                </Link>
              </article>
            </li>
          )
        )}
      </ul>
    </section>
  );
}

export default Foods;
