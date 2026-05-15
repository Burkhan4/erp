import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Classes from "../pages/Classes";
import Boshqarish from "../pages/Boshqarish";
import Kurslar from "../pages/Kurslar";
import Xonalar from "../pages/Xonalar";
import Teachers from "../pages/Teachers";
import Guruhlar from "../pages/Guruhlar";

import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/dashboard",

    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "students",
        element: <Students />,
      },

      {
        path: "classes",
        element: <Classes />,
      },

      {
        path: "guruhlar",
        element: <Guruhlar />,
      },

      {
        path: "oqituvchilar",
        element: <Teachers />,
      },

      {
        path: "boshqarish",
        element: <Boshqarish />,
        children: [
          {
            index: true,
            element: <div className="text-gray-500">Boshqarish bo'limini tanlang: Kurslar yoki Xonalar.</div>,
          },
          {
            path: "kurslar",
            element: <Kurslar />,
          },
          {
            path: "xonalar",
            element: <Xonalar />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);