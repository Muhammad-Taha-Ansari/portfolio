import React, { lazy, Suspense } from "react";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const TechGridCanvas = lazy(() => import("./canvas/TechGrid"));

const Tech = () => {
  return (
    <div className="w-full h-[280px] xs:h-[340px] sm:h-[420px] md:h-[480px]">
      <Suspense fallback={null}>
        <TechGridCanvas technologies={technologies} />
      </Suspense>
    </div>
  );
};

export default SectionWrapper(Tech, "");