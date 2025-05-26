import { createBrowserRouter, RouterProvider } from "react-router";
import { Errors } from "./Errors/Errors";
import { Statistics } from "./Statistics/Statistics";
import { Dashboard } from "./Dashboard/Dashboard";
import { Sync } from "./Sync/Sync";
import { Load } from "./Load/Load";
import { Collection } from "./Collection/Collection";
import { Utils } from "./Utils/Utils";

export const AppRoutes = [
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
];

const router = createBrowserRouter(AppRoutes);

export const EntryPoint = () => {
  return <RouterProvider router={router} />;
};
