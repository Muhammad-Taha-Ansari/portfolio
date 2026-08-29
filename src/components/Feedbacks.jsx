import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => {
  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className="bg-black-200 border border-l-purple-600 rounded-3xl p-10 xs:w-[320px] w-full"
    >
      <p className="text-white text-[48px] font-black">"</p>
      <div className="mt-1 ">
        <p className="text-white tracking-wider text-[18px]">{testimonial}</p>
        <div className="flex justify-between gap-1 mt-5 items-center ">
          <div className="flex-1 flex flex-col">
            <p className="text-white font-medium text-[15px]">
              <span className="blue-text-gradient">@</span>
              {name}
            </p>
            <p className="mt-1 text-secondary text-[15px]">{designation}</p>
            <p className="mt-1 text-secondary text-[15px] blue-text-gradient">
              {company}
            </p>
          </div>
          <img
            src={image}
            alt="Feedback"
            className="w-14 h-14 rounded-full object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  return (
    <div className="bg-black-100 rounded-[20px]">
      <div
        className={`${styles.padding}  bg-tertiary rounded-2xl min-h-[250px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText}`}>What others say!</p>
          <h2 className={`${styles.sectionHeadText}`}>Testimonials.</h2>
        </motion.div>
      </div>
      <div
        className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap gap-5 justify-center`}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
