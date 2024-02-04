import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import App from "./App";
import Write from "./pages/Write";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordRecovery from "./pages/PasswordRecovery";
import ProtectedRoute from "./components/hoc/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<Home />} />
      <Route path="blogs/:id" element={<BlogDetails />} />
      <Route element={<ProtectedRoute />}>
        <Route path="write" element={<Write />} />
      </Route>
      <Route path="contact" element={<Contact />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="recovery" element={<PasswordRecovery />} />
    </Route>
  )
);

export default router;
