import React from "react";
import { RouterProvider } from "react-router-dom";
import { PageTransitionProvider } from "./utils/PageTransitionProvider";
import { router } from "./routes";

export default function App() {
  return (
    <PageTransitionProvider>
      <RouterProvider router={router} />
    </PageTransitionProvider>
  );
}
