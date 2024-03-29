import React, { useRef, useEffect, useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Chatroom from "./views/Chatroom";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const [isAuth, setIsAuth] = useState(false);
  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <LayoutDefault>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />}
            />
            <Route path="/chatroom" element={<Chatroom isAuth={isAuth} />} />
          </Routes>
        </LayoutDefault>
      )}
    />
  );
};

export default App;
