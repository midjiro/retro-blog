import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import PublicationDetails from "./pages/PublicationsDetails";
import App from "./App";
import Write from "./pages/Write";
import Contact from "./pages/Contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index element={<Home />} />
      <Route path="/publications/:id" element={<PublicationDetails />} />
      <Route path="/write" element={<Write />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
  )
);

export default router;
