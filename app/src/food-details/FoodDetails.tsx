import { Link, useParams } from "react-router-dom";

function FoodDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-500 bg-opacity-70 flex items-center justify-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-details-title"
        className="w-full h-auto max-w-lg border-4 bg-purple-500 text-white p-5"
      >
        <h2
          id="food-details-title"
          className="text-3xl font-bold underline mb-4"
        >
          Food Details for: {id}
        </h2>
        <form>
          <label htmlFor="calories" className="block  text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="calories"
            id="calories"
            className="shadow mb-4 w-full h-10 px-2 text-black"
          />
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline text-white font-bold py-2 px-4 border-2 mr-2">
            Save
          </button>
          <Link
            to="/"
            className="inline-block shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline text-white font-bold py-2 px-4 border-2"
          >
            Close
          </Link>
        </form>
      </div>
    </div>
  );
}

export default FoodDetails;
