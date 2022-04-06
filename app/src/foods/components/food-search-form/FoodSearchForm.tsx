import type { FormEventHandler } from "react";

type TFoodSearchFormProps = {
  onSubmit: FormEventHandler;
};

const FoodSearchForm = ({ onSubmit }: TFoodSearchFormProps) => {
  return (
    <form className="mb-8" onSubmit={onSubmit}>
      <label
        htmlFor="foodName"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Food Name
      </label>
      <input
        type="search"
        name="foodName"
        id="foodName"
        className="shadow mb-4 w-full h-10 px-2"
        placeholder="Search for a food by its name"
      />
      <button className="block shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline text-white font-bold py-2 px-4">
        Search
      </button>
    </form>
  );
};

export default FoodSearchForm;
