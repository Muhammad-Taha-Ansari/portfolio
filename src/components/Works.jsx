import React, { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github,live } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import LikeButton from "./LikeButton";


const ProjectCard = ({
  index,
  itemId,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_link,
  initialLikes,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[340px] w-full min-h-[500px] flex flex-col border border-white/[0.06] hover:border-[#915eff]/40 hover:shadow-[0_0_30px_-8px_rgba(145,94,255,0.35)] transition-all duration-300'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 gap-2 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>

            {/* this one is live link */}
            <div
              onClick={() => window.open(live_link, "_blank")}
              className='w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={live}
                alt='source code'
                className='w-full h-auto rounded-full object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-auto pt-4 flex items-end justify-between flex-wrap gap-2'>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
          <LikeButton itemId={itemId} initialCount={initialLikes} />
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetch("/api/likes")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => setLikes(data))
      .catch(() => {});
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-5xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => {
          const itemId = `project-${index}`;
          return (
            <ProjectCard
              key={itemId}
              index={index}
              itemId={itemId}
              initialLikes={likes[itemId] || 0}
              {...project}
            />
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");
