import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConnectionCheck from "./components/ConnectionCheck";
import Header from "./components/Header";
import Container from "./components/styled/Container.styled";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  return (
    <>
      <ConnectionCheck>
        <ToastContainer position="top-center" />
        <AuthContext.Provider value={currentUser}>
          <Header />
          <Container>
            <Outlet />
          </Container>
        </AuthContext.Provider>
      </ConnectionCheck>
    </>
  );
}

export default App;
