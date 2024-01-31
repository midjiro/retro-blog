import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { recoverPassword, signIn, signUp } from "./services/user";
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
    <Route element={<App />}>
      <Route index element={<Home />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/write" element={<Write />} />
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="/sign-in" element={<SignIn onSubmit={signIn} />} />
      <Route path="/sign-up" element={<SignUp onSubmit={signUp} />} />
      <Route
        path="/recovery"
        element={<PasswordRecovery onSubmit={recoverPassword} />}
      />
    </Route>
  )
);

export default router;
