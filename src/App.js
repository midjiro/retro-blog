import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConnectionCheck from "./components/hoc/ConnectionCheck";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ConnectionCheck>
        <ToastContainer position="top-center" />
        <Header />
        <main className="container">
          <Outlet />
        </main>
      </ConnectionCheck>
    </>
  );
}

export default App;
