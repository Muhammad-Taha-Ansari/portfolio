import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { involvements } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const InvolvementCard = ({ involvement }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #212631" }}
      date={involvement.date}
      iconStyle={{ background: involvement.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={involvement.icon}
            alt={involvement.company_name}
            className="w-[90%] h-[90%] object-contain"
            style={
              involvement.iconScale
                ? { transform: `scale(${involvement.iconScale})` }
                : undefined
            }
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{involvement.title}</h3>
        <p className="text-secondary text-[16px] font-semibold">
          {involvement.company_name}
        </p>
      </div>
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {involvement.points.map((point, index) => (
          <li
            key={`involvement-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >{point}</li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Involvement = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Beyond the classroom</p>
        <h2 className={styles.sectionHeadText}>Involvement.</h2>
      </motion.div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {involvements.map((involvement, index) => (
            <InvolvementCard key={index} involvement={involvement} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Involvement, "involvement");
