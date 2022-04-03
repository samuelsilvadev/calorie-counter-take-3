import { Outlet } from "react-router-dom";
import Navigation from "../navigation";

function Layout() {
  return (
    <div className="flex justify-center mt-12 flex-col-reverse md:flex-row">
      <main className="w-full md:max-w-lg px-8">
        <Outlet />
      </main>
      <aside className="px-8 md:px-0 mb-5 md:mb-0">
        <Navigation />
      </aside>
    </div>
  );
}

export default Layout;
