import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from "react";

import {
  Hero,
  Navbar,
  About,
  Tech,
  Experience,
  Involvement,
  Certificates,
  Works,
  Feedbacks,
  Contact,
} from "./components";

const StarsCanvas = lazy(() => import("./components/canvas/Stars"));
const BlogList = lazy(() => import("./components/BlogList"));
const BlogPost = lazy(() => import("./components/BlogPost"));

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <Hero />
      </div>

      <About />
      <Experience />
      <Involvement />
      <Tech />
      <Works />
      <Certificates />
      <Feedbacks />

      <div className="relative z-0">
        <Contact />

        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter basename="/portfolio">
      <div className="relative z-0 bg-primary">
        <Navbar />

        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/publications" element={<BlogList />} />
            <Route path="/publications/:slug" element={<BlogPost />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
