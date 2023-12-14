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
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { recoverPassword, signIn, signUp } from "./services/user";
import PasswordRecovery from "./pages/PasswordRecovery";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index element={<Home />} />
      <Route path="/publications/:id" element={<PublicationDetails />} />
      <Route path="/write" element={<Write />} />
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
