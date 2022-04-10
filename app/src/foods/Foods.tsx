import { FormEventHandler, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { queryClient } from "queryClientSetup";
import Star from "components/icons/Star";
import { Food } from "types/Food";
import FoodSearchForm from "./components/food-search-form";
import FoodsWrapper from "./components/foods-wrapper";
import { getUser } from "App";

function getAllFoods(): Promise<TAllFoodsResponse> {
  return fetch(process.env.REACT_APP_API_URL + "/foods").then((response) =>
    response.json()
  );
}

function getAllFavoriteFoods(): Promise<TAllFavoriteFoodsResponse> {
  return fetch(process.env.REACT_APP_API_URL + "/favorite-foods").then(
    (response) => response.json()
  );
}

function markFavoriteFood({
  foodId,
  userId,
}: {
  foodId: string;
  userId: string;
}): Promise<TMarkFavoriteFoodResponse> {
  return fetch(process.env.REACT_APP_API_URL + "/favorite-foods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      food: foodId,
      user: userId,
    }),
  }).then((response) => response.json());
}

function unMarkFavoriteFood(
  foodId: string
): Promise<TUnMarkFavoriteFoodResponse> {
  return fetch(process.env.REACT_APP_API_URL + "/favorite-foods/" + foodId, {
    method: "DELETE",
  }).then((response) => response.json());
}

export type TAllFoodsResponse = {
  data: Food[];
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
  totalCount: number;
};

export type TAllFavoriteFoodsResponse = {
  data: TFavoriteFood[];
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
  totalCount: number;
};

type TFavoriteFood = {
  createdAt: string;
  food: string;
  id: string;
  updatedAt: string;
  user: string;
};

type TMarkFavoriteFoodResponse = {
  data: TFavoriteFood;
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
};

type TUnMarkFavoriteFoodResponse = {
  data: TFavoriteFood;
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
  deleted: boolean;
};

function Foods() {
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const location = useLocation();
  const { data: userData } = useQuery("user", getUser);
  const { isLoading, data, error } = useQuery<TAllFoodsResponse>(
    "foods",
    getAllFoods,
    {
      onSuccess: (data) => {
        setFilteredFoods(data.data);
      },
    }
  );
  const { data: favoriteFoodsData } = useQuery<TAllFavoriteFoodsResponse>(
    "favorite-foods",
    getAllFavoriteFoods
  );
  const { mutate: favorite } = useMutation(markFavoriteFood, {
    onSuccess: (response) => {
      const previousFavoriteFoodsResponse =
        queryClient.getQueryData<TAllFavoriteFoodsResponse>("favorite-foods");

      if (previousFavoriteFoodsResponse) {
        const updatedFavoriteFoodsResponse: TAllFavoriteFoodsResponse = {
          ...previousFavoriteFoodsResponse,
          data: [...previousFavoriteFoodsResponse.data, response.data],
        };

        queryClient.setQueryData(
          "favorite-foods",
          updatedFavoriteFoodsResponse
        );
      }
    },
  });
  const { mutate: unFavorite } = useMutation(unMarkFavoriteFood, {
    onSuccess: (_, favoriteId) => {
      const previousFavoriteFoodsResponse =
        queryClient.getQueryData<TAllFavoriteFoodsResponse>("favorite-foods");

      if (previousFavoriteFoodsResponse) {
        const updatedFavoriteFoodsResponse: TAllFavoriteFoodsResponse = {
          ...previousFavoriteFoodsResponse,
          data: previousFavoriteFoodsResponse.data.filter(
            ({ id }) => id !== favoriteId
          ),
        };

        queryClient.setQueryData(
          "favorite-foods",
          updatedFavoriteFoodsResponse
        );
      }
    },
  });

  const foods = data?.data ?? [];
  const favoriteFoods = favoriteFoodsData?.data ?? [];
  const userId = userData?.data?.[0].id;

  useEffect(() => {
    if (foods.length > 0 && filteredFoods.length === 0) {
      setFilteredFoods(foods);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const typedFoodName = form.foodName.value;

    const foodsMatches = foods.filter(({ name }) =>
      name.startsWith(typedFoodName)
    );

    setFilteredFoods(foodsMatches);
  };

  const createHandleClickOnFavorite = (foodId: string) => () => {
    if (userId) {
      favorite({ foodId, userId });
    }
  };

  const createHandleClickUnFavorite = (foodId: string) => () => {
    unFavorite(foodId);
  };

  const getFavoriteId = (foodId: string) => {
    return favoriteFoods.find(({ food }) => food === foodId)?.id;
  };

  return (
    <FoodsWrapper>
      <FoodSearchForm onSubmit={handleSubmit} />
      {filteredFoods.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {filteredFoods.map(
            ({ id, name, portionDisplayName, portionAmount, calories }) => {
              const favoriteId = getFavoriteId(id);
              const isCurrentFoodFavorite = !!favoriteId;

              return (
                <li key={id} className="mb-4">
                  <article className="grid gap-x-4 md:gap-x-0 grid-cols-2 md:grid-cols-[1fr_60px_130px]">
                    <h2 className="col-start-1 col-end-3 md:col-end-2">
                      {name}
                    </h2>
                    <h3 className="col-start-1 col-end-3 md:col-end-2 mb-2 md:mb-0">
                      {portionAmount} {portionDisplayName} has {calories}{" "}
                      calories
                    </h3>
                    <button
                      onClick={
                        isCurrentFoodFavorite
                          ? createHandleClickUnFavorite(favoriteId)
                          : createHandleClickOnFavorite(id)
                      }
                      className="col-start-1 col-end-2 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-3 md:justify-self-start flex justify-center items-center shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline text-white font-bold py-2 px-4"
                    >
                      <Star filled={isCurrentFoodFavorite} />
                    </button>
                    <Link
                      className="col-start-2 col-end-3 md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-3 md:justify-self-end flex justify-center md:justify-start items-center shadow bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4"
                      to={`/food/${id}`}
                      state={{ previousLocation: location }}
                    >
                      View details
                    </Link>
                  </article>
                </li>
              );
            }
          )}
        </ul>
      )}
    </FoodsWrapper>
  );
}

export default Foods;
