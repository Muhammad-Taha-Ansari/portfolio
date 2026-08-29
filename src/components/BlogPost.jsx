import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { styles } from "../styles";
import { fadeIn } from "../utils/motion";
import { getPostBySlug } from "../utils/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Muhammad Taha Ansari`;
    }
    return () => {
      document.title = "Muhammad Taha Ansari | Electrical Engineer & Hardware Security";
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/publications" replace />;
  }

  return (
    <div className={`${styles.paddingX} max-w-4xl mx-auto pt-32 pb-24 min-h-screen`}>
      <Link
        to="/publications"
        className="text-secondary hover:text-white text-[14px] transition-colors"
      >
        ← Back to Publications
      </Link>

      <motion.div
        variants={fadeIn("up", "spring", 0.1, 0.75)}
        initial="hidden"
        animate="show"
        className="mt-6"
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
        <span className="inline-block mt-2 text-[12px] uppercase tracking-wider text-[#915eff] font-semibold">
          {post.type === "research-paper"
            ? "Research Paper"
            : post.type === "article"
            ? "Article"
            : "Blog"}
        </span>
        <h1 className="text-white font-black md:text-[46px] sm:text-[36px] text-[28px] mt-2">
          {post.title}
        </h1>

        {post.pdf && (
          <a
            href={post.pdf}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-block mt-5 bg-tertiary hover:bg-[#915eff] transition-colors text-white text-[14px] font-medium py-2.5 px-5 rounded-lg"
          >
            📄 Download PDF
          </a>
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

        <div className="prose prose-invert prose-headings:text-white prose-p:text-secondary prose-li:text-secondary prose-strong:text-white prose-a:text-[#915eff] max-w-none mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPost;
