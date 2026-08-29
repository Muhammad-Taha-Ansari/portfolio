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
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
        <Hero></Hero>
      </div>
      <About></About>
      <Experience></Experience>
      <Involvement></Involvement>
      <Tech></Tech>
      <Works></Works>
      <Certificates></Certificates>
      <Feedbacks></Feedbacks>
      <div className="relative z-0">
        <Contact></Contact>
        <Suspense fallback={null}>
          <StarsCanvas></StarsCanvas>
        </Suspense>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Navbar></Navbar>
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
