import { createBrowserRouter, RouterProvider } from "react-router";
import { Errors } from "./Errors/Errors";
import { Statistics } from "./Statistics/Statistics";
import { Dashboard } from "./Dashboard/Dashboard";
import { Sync } from "./Sync/Sync";
import { Load } from "./Load/Load";
import { Collection } from "./Collection/Collection";
import { Utils } from "./Utils/Utils";
import { useUnit } from "effector-react";
import { $token } from "./Auth/store";
import { Auth } from "./Auth/Auth";
import { Sale } from "./Sale/Sale";
import { useEffect } from "react";
import { loadDictsFx } from "./store";

const AppRoutes = [
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/errors",
    Component: Errors,
  },
  {
    path: "/statistics",
    Component: Statistics,
  },
  {
    path: "/sync",
    Component: Sync,
  },
  {
    path: "/load",
    Component: Load,
  },
  {
    path: "/collection",
    Component: Collection,
  },
  {
    path: "/utils",
    Component: Utils,
  },
  {
    path: "/sale",
    Component: Sale,
  },
];

const router = createBrowserRouter(AppRoutes);

export const EntryPoint = () => {
  const token = useUnit($token);

  useEffect(() => {
    if (token) loadDictsFx();
  }, [token]);

  if (!token) {
    return <Auth />;
  }

  return <RouterProvider router={router} />;
};
