import { ChangeEventHandler, FormEventHandler, useReducer } from "react";
import { useMutation } from "react-query";
import { queryClient } from "queryClientSetup";
import type { TAllFoodsResponse } from "foods/Foods";
import type { Food } from "types/Food";

type NewFoodFormState = {
  name: string;
  portion: number;
  portionAmount: number;
  portionDisplayName: string;
  calories: number;
};

type Action =
  | { type: "ON_CHANGE"; name: string; value: string }
  | { type: "RESET" };

type TSaveFoodResponse = {
  data: Food;
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
};

function buildDefaultValues() {
  return {
    calories: 0,
    saturatedFats: 1,
    alcohol: 0,
    addedSugars: 0,
    solidFats: 0,
    oils: 0,
    dryBeansPeas: 0,
    soy: 0,
    meats: 0,
    milk: 0,
    fruits: 0,
    otherVegetables: 0,
    starchyVegetables: 0,
    darkGreenVegetables: 0,
    orangeVegetables: 0,
    vegetables: 0,
    wholeGrains: 0,
    grains: 0,
    multiplier: 0,
    increment: 0,
    factor: 0,
  };
}

function saveFood(food: NewFoodFormState): Promise<TSaveFoodResponse> {
  return fetch(process.env.REACT_APP_API_URL + "/foods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...buildDefaultValues(), ...food }),
  }).then((response) => response.json());
}

const initialState: NewFoodFormState = {
  name: "",
  portion: 0,
  portionAmount: 0,
  portionDisplayName: "",
  calories: 0,
};

const newFoodReducer = (state: NewFoodFormState, action: Action) => {
  switch (action.type) {
    case "ON_CHANGE": {
      const { name, value } = action;

      return {
        ...state,
        [name]: value,
      };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return state;
  }
};

function NewFood() {
  const [formState, dispatch] = useReducer(newFoodReducer, {
    name: "",
    portion: 0,
    portionAmount: 0,
    portionDisplayName: "",
    calories: 0,
  });

  const { mutate, isLoading } = useMutation(saveFood, {
    onSuccess: (response) => {
      dispatch({ type: "RESET" });

      const previousFoodsResponse =
        queryClient.getQueryData<TAllFoodsResponse>("foods");

      if (previousFoodsResponse) {
        const updatedFoodsResponse: TAllFoodsResponse = {
          ...previousFoodsResponse,
          data: [response.data, ...(previousFoodsResponse?.data ?? [])],
        };

        queryClient.setQueryData("foods", updatedFoodsResponse);
      }
    },
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "ON_CHANGE",
      name,
      value,
    });
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    mutate(formState);
  };

  return (
    <section>
      <h1 className="text-3xl font-bold underline mb-12">New Food</h1>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="shadow mb-4 w-full h-10 px-2"
          value={formState.name}
          onChange={handleChange}
        />

        <label
          htmlFor="portion"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Portion
        </label>
        <input
          type="number"
          name="portion"
          id="portion"
          className="shadow mb-4 w-full h-10 px-2"
          value={formState.portion}
          onChange={handleChange}
        />

        <label
          htmlFor="portionAmount"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Portion Amount
        </label>
        <input
          type="number"
          name="portionAmount"
          id="portionAmount"
          className="shadow mb-4 w-full h-10 px-2"
          value={formState.portionAmount}
          onChange={handleChange}
        />

        <label
          htmlFor="portionDisplayName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Portion display name
        </label>
        <input
          type="text"
          name="portionDisplayName"
          id="portionDisplayName"
          className="shadow mb-4 w-full h-10 px-2"
          value={formState.portionDisplayName}
          onChange={handleChange}
        />

        <label
          htmlFor="calories"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Calories
        </label>
        <input
          type="text"
          name="calories"
          id="calories"
          className="shadow mb-4 w-full h-10 px-2"
          value={formState.calories}
          onChange={handleChange}
        />

        <button
          disabled={isLoading}
          className="block shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline text-white font-bold py-2 px-4"
        >
          Save
        </button>
      </form>
    </section>
  );
}

export default NewFood;
