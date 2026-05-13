import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Boshqarish() {
  const location = useLocation();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Boshqarish</h1>

        <div className="flex space-x-6 mt-2">
          <Link
            to="/dashboard/boshqarish/kurslar"
            className={`font-medium transition ${
              location.pathname === "/dashboard/boshqarish/kurslar"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Kurslar
          </Link>

          <Link
            to="/dashboard/boshqarish/xonalar"
            className={`font-medium transition ${
              location.pathname === "/dashboard/boshqarish/xonalar"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Xonalar
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
