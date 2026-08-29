import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { getAllPosts } from "../utils/blog";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "blog", label: "Blog" },
  { key: "article", label: "Articles" },
  { key: "research-paper", label: "Research Papers" },
];

const BlogList = () => {
  const posts = getAllPosts();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => post.type === activeFilter);

  return (
    <div className={`${styles.paddingX} max-w-7xl mx-auto pt-32 pb-20 min-h-screen`}>
      <motion.div variants={textVariant()} initial="hidden" animate="show">
        <p className={styles.sectionSubText}>My writing</p>
        <h1 className={styles.sectionHeadText}>Publications</h1>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        initial="hidden"
        animate="show"
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Research papers, articles, and blog posts on hardware security,
        embedded systems, and post-quantum cryptography.
      </motion.p>

      <div className="mt-8 flex flex-wrap gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`text-[14px] font-medium px-5 py-2 rounded-full transition-colors ${
              activeFilter === filter.key
                ? "bg-[#915eff] text-white"
                : "bg-tertiary text-secondary hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="mt-10 text-secondary">
          {posts.length === 0
            ? "No posts yet — check back soon."
            : "Nothing in this category yet."}
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              initial="hidden"
              animate="show"
            >
              <Link
                to={`/publications/${post.slug}`}
                className="block bg-tertiary p-6 rounded-2xl h-full hover:-translate-y-1 transition-transform duration-300"
              >
                {post.date && (
                  <p className="text-secondary text-[13px] uppercase tracking-widest">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                <span className="inline-block mt-2 text-[11px] uppercase tracking-wider text-[#915eff] font-semibold">
                  {post.type === "research-paper"
                    ? "Research Paper"
                    : post.type === "article"
                    ? "Article"
                    : "Blog"}
                </span>
                <h3 className="text-white font-bold text-[22px] mt-1">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-secondary text-[14px] mt-3 leading-[24px]">
                    {post.excerpt}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] text-[#915eff] bg-[#915eff1a] px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-white text-[14px] mt-5 font-medium">
                  Read more →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
