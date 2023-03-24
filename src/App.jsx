import React, {useContext, Fragment } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/auth-context";

function App() {
  // If it is an empty array, the app will only run once because there are no
  // dependencies. If the dependency array is non-empty, we can put dependencies
  // in it.

  const ctx = useContext(AuthContext);

  return (
    <Fragment>
      <MainHeader/>
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <Home />}
        </main>
    </Fragment>
  );
}

export default App;
