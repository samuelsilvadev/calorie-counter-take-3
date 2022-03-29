import { ChangeEventHandler, FormEventHandler, useReducer } from "react";
import { useMutation } from "react-query";

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

function saveFood(food: NewFoodFormState) {
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
    onSuccess: () => {
      dispatch({ type: "RESET" });
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
    <>
      <h1 className="text-3xl font-bold underline">New Food</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg px-8 m-auto">
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
          className="block shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
        >
          Save
        </button>
      </form>
    </>
  );
}

export default NewFood;
