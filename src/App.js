import ConnectionCheck from "./components/ConnectionCheck";
import Header from "./components/Header";
import Container from "./components/styled/Container.styled";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Container>
        <ConnectionCheck>
          <Outlet />
        </ConnectionCheck>
      </Container>
    </>
  );
}

export default App;
