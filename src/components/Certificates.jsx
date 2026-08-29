import React, { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { live } from "../assets";
import { SectionWrapper } from "../hoc";
import { certifications } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import LikeButton from "./LikeButton";

const CertificateCard = ({
  index,
  itemId,
  name,
  issuer,
  date,
  image,
  verify_link,
  initialLikes,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.3, 0.75)}>
      <Tilt
        options={{
          max: 25,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[300px] w-full border border-white/[0.06] hover:border-[#915eff]/40 hover:shadow-[0_0_30px_-8px_rgba(145,94,255,0.35)] transition-all duration-300"
      >
        <div className="relative w-full h-[180px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 gap-2 card-img_hover">
            <div
              onClick={() => window.open(verify_link, "_blank")}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={live}
                alt="verify certificate"
                className="w-full h-auto rounded-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-white font-bold text-[18px]">{name}</h3>
          <p className="mt-1 text-secondary text-[14px]">{issuer}</p>
          {date && <p className="mt-1 text-secondary text-[12px]">{date}</p>}
        </div>

        <div className="mt-4">
          <LikeButton itemId={itemId} initialCount={initialLikes} />
        </div>
      </Tilt>
    </motion.div>
  );
};

const Certificates = () => {
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
        <p className={`${styles.sectionSubText}`}>Credentials</p>
        <h2 className={`${styles.sectionHeadText}`}>Certificates.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-5xl leading-[30px]"
        >
          Certifications and courses I've completed, each verifiable through
          its issuing platform.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {certifications.map((cert, index) => {
          const itemId = `cert-${index}`;
          return (
            <CertificateCard
              key={itemId}
              index={index}
              itemId={itemId}
              initialLikes={likes[itemId] || 0}
              {...cert}
            />
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Certificates, "certificates");
