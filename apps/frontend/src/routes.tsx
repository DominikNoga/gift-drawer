import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./shared/components/RootLayout/RootLayout";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import EventPage from "./pages/EventPage";

export const ROUTES_NAMES = {
  HOME: '/',
  CREATE_EVENT: 'create-event',
  EVENT: 'event',
} as const;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES_NAMES.CREATE_EVENT,
        element: <CreateEventPage />,
      },
      {
        path: `${ROUTES_NAMES.EVENT}/:eventId/:joinCode`,
        element: <EventPage />,
      }
    ],
  }
]);
