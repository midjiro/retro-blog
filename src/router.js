import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import PublicationDetails from "./pages/PublicationsDetails";
import App from "./App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index element={<Home />} />
      <Route path="/publications/:id" element={<PublicationDetails />} />
    </Route>
  )
);

export default router;
