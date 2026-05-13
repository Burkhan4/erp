import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Boshqarish() {
  const location = useLocation();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Boshqarish</h1>
        <div className="flex space-x-6 mt-2">
          <a
            href="/dashboard/boshqarish/kurslar"
            className={`font-medium transition ${
              location.pathname === "/dashboard/boshqarish/kurslar"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Kurslar
          </a>
          <a
            href="/dashboard/boshqarish/xonalar"
            className={`font-medium transition ${
              location.pathname === "/dashboard/boshqarish/xonalar"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Xonalar
          </a>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
