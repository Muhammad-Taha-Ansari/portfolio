import React, { useEffect, useState } from "react";

const LikeButton = ({ itemId, initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    try {
      const likedItems = JSON.parse(localStorage.getItem("likedItems") || "[]");
      setLiked(likedItems.includes(itemId));
    } catch {
      // ignore
    }
  }, [itemId]);

  const toggleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nextLiked = !liked;
    const action = nextLiked ? "like" : "unlike";

    setLiked(nextLiked);
    setCount((c) => (nextLiked ? c + 1 : Math.max(0, c - 1)));

    try {
      const likedItems = JSON.parse(localStorage.getItem("likedItems") || "[]");
      const updated = nextLiked
        ? [...likedItems, itemId]
        : likedItems.filter((id) => id !== itemId);
      localStorage.setItem("likedItems", JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId, action }),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.count === "number") setCount(data.count);
      }
    } catch (err) {
      console.error("Like request failed:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      className="flex items-center gap-1.5 text-[13px] text-secondary hover:text-[#915eff] transition-colors"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={liked ? "#915eff" : "none"}
        stroke={liked ? "#915eff" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span>{count}</span>
    </button>
  );
};

export default LikeButton;
