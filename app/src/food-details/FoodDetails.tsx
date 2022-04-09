import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Food } from "types/Food";

function getFood(id: string) {
  return fetch(process.env.REACT_APP_API_URL + "/foods/" + id).then(
    (response) => response.json()
  );
}

type TFoodResponse = {
  data: Food;
  error: boolean;
  responseTimestamp: string;
  status: boolean;
  statusCode: number;
  totalCount: number;
};

function FoodDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useQuery<TFoodResponse | null>(["food", id], () =>
    id ? getFood(id) : null
  );
  const food = data?.data;
  const focusedElementBeforeOpenRef = useRef<HTMLElement | null>(null);
  const caloriesInputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(
    null
  );
  const [consumedCalories, setConsumedCalories] = useState<string>("");

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    setConsumedCalories(value);

    if (!value) {
      setCalculatedCalories(null);
    }
  };

  const handleOnSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    setCalculatedCalories(Number(consumedCalories) * (food?.calories ?? 1));
  };

  useEffect(() => {
    focusedElementBeforeOpenRef.current = document.activeElement as HTMLElement;

    return () => {
      focusedElementBeforeOpenRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    function handleOnKeyDown(event: KeyboardEvent) {
      const currentFocusableElement = document.activeElement;

      if (event.key === "Tab" && !event.shiftKey) {
        if (
          currentFocusableElement ===
          focusableElements[focusableElements.length - 1]
        ) {
          event.preventDefault();
          focusableElements[0]?.focus();
        }
      }

      if (event.key === "Tab" && event.shiftKey) {
        if (currentFocusableElement === focusableElements[0]) {
          event.preventDefault();
          focusableElements[focusableElements.length - 1]?.focus();
        }
      }
    }

    const wrapper = wrapperRef.current;
    const focusableElements: HTMLElement[] = wrapper
      ? Array.from(wrapper.querySelectorAll("a, button, input"))
      : [];

    wrapper?.addEventListener("keydown", handleOnKeyDown);

    return () => {
      wrapper?.removeEventListener("keydown", handleOnKeyDown);
    };
  }, []);

  useEffect(() => {
    caloriesInputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleOnKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        navigate("/");
      }
    }

    document.addEventListener("keydown", handleOnKeyDown);

    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-full h-full bg-gray-500 bg-opacity-70 flex items-center justify-center">
      <div
        ref={wrapperRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-details-title"
        className="w-full h-auto max-w-lg border-4 bg-purple-500 text-white p-5"
      >
        <h2
          id="food-details-title"
          className="text-3xl font-bold underline mb-4"
        >
          Food Details for: {food?.name}
        </h2>
        <form onSubmit={handleOnSubmit}>
          <label
            htmlFor="consumedCalories"
            className="block  text-sm font-bold mb-2"
          >
            Amount of {food?.name} consumed:
          </label>
          <input
            required
            type="number"
            name="consumedCalories"
            id="consumedCalories"
            className="shadow mb-4 w-full h-10 px-2 text-black"
            ref={caloriesInputRef}
            onChange={handleOnChange}
            value={consumedCalories}
          />
          {typeof calculatedCalories === "number" && (
            <p className="p-3 border-2 mb-4">
              You have consumed {calculatedCalories} calories
            </p>
          )}
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline text-white font-bold py-2 px-4 border-2 mr-2">
            Calculate calories
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
