import { Link, useLocation } from "react-router-dom";

const MENUS = [
  {
    to: "/",
    label: "all foods",
  },
  {
    to: "/new",
    label: "add new food",
  },
];

function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav>
      <ul>
        {MENUS.map(({ to, label }) => {
          const isSelected = to === pathname;

          return (
            <li
              key={to}
              className={`${
                isSelected
                  ? "px-2 flex border-2 border-purple-500 pointer-events-none"
                  : "px-2 flex border-2 border-transparent"
              }`}
            >
              <span className="mr-2">{">"}</span>
              <Link
                to={to}
                className="text-purple-500 text-md underline flex-1"
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
