import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logoWordmark, menu, close, github, linkedin } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    setActive(id);
    setToggle(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary/80 backdrop-blur-md border-b border-white/[0.06] shadow-[0_1px_0_0_rgba(145,94,255,0.15)]`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-[20px] flex-shrink-0"
          onClick={() => {
            setActive("");
            window.scroll(0, 0);
          }}
        >
          <img
            src={logoWordmark}
            alt="Muhammad Taha Ansari"
            className="h-auto max-w-[130px] sm:max-w-[160px] lg:max-w-[115px] xl:max-w-[180px] w-auto object-contain"
          />
        </Link>

        <ul className="list-none hidden gap-4 xl:gap-7 flex-row lg:flex items-center">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.id ? "text-white" : "text-secondary"
              } hover:text-white text-[14px] xl:text-[17px] font-medium cursor-pointer whitespace-nowrap`}
              onClick={() => goToSection(link.id)}
            >
              {link.title}
            </li>
          ))}
          <li
            className={`${
              location.pathname.startsWith("/publications") ? "text-white" : "text-secondary"
            } hover:text-white text-[14px] xl:text-[17px] font-medium cursor-pointer whitespace-nowrap`}
          >
            <Link to="/publications">Publications</Link>
          </li>
          <li
            className={`${
              active === "contact" ? "text-white" : "text-secondary"
            } hover:text-white text-[14px] xl:text-[17px] font-medium cursor-pointer whitespace-nowrap`}
            onClick={() => goToSection("contact")}
          >
            Contact
          </li>
          <li>
            <div className="flex gap-2 xl:gap-4 items-center justify-center">
              <div className="flex gap-2 items-center justify-center">
                <a
                  href="https://github.com/Muhammad-Taha-Ansari"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={github} alt="Github" className="h-[26px] xl:h-[35px] w-auto" />
                </a>
                <a
                  href="https://www.linkedin.com/in/1aha/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={linkedin}
                    alt="LinkedIn"
                    className="h-[30px] xl:h-[40px] w-auto rounded-m"
                  />
                </a>
              </div>
              <a
                href="/resume.pdf"
                download
                className="bg-gradient-to-r from-[#915eff] to-[#5c7cfa] hover:shadow-[0_0_18px_rgba(145,94,255,0.55)] hover:-translate-y-0.5 transition-all duration-300 text-white text-[12px] xl:text-[14px] font-medium py-1.5 xl:py-2 px-2.5 xl:px-4 rounded-lg whitespace-nowrap"
              >
                Resume
              </a>
            </div>
          </li>
        </ul>
        <div className="lg:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="Menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl `}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 ">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.id ? "text-white" : "text-secondary"
                  } cursor-pointer font-poppins font-medium text-[16px] `}
                  onClick={() => goToSection(link.id)}
                >
                  {link.title}
                </li>
              ))}
              <li
                className="cursor-pointer font-poppins font-medium text-[16px] text-secondary hover:text-white"
                onClick={() => setToggle(false)}
              >
                <Link to="/publications">Publications</Link>
              </li>
              <li
                className={`${
                  active === "contact" ? "text-white" : "text-secondary"
                } cursor-pointer font-poppins font-medium text-[16px] `}
                onClick={() => goToSection("contact")}
              >
                Contact
              </li>
              <li>
                <div className="flex gap-4 items-center justify-center">
                  <div className="flex gap-2 items-center justify-center">
                    <a
                      href="https://github.com/Muhammad-Taha-Ansari"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={github}
                        alt="Github"
                        className="h-[30px] w-auto"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/1aha/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={linkedin}
                        alt="LinkedIn"
                        className="h-[35px] w-auto rounded-md"
                      />
                    </a>
                  </div>
                  <a
                    href="/resume.pdf"
                    download
                    className="bg-gradient-to-r from-[#915eff] to-[#5c7cfa] hover:shadow-[0_0_18px_rgba(145,94,255,0.55)] transition-all duration-300 text-white text-[13px] font-medium py-2 px-3 rounded-lg"
                  >
                    Resume
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
