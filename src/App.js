import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import NavBar from "./components/navBar";
import { CurrentUserProvider } from "./context/currentUser";
import CurrentUserChecker from "./components/currentUserChecker";

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

export default App;
