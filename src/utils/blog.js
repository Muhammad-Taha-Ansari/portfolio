// Loads every .md file in src/content/blog/ at build time (Vite feature —
// no backend/database needed). To publish a new post: add a new .md file
// to src/content/blog/ with the frontmatter shown below, then git commit +
// push — Cloudflare Pages rebuilds and it's live.
//
// ---
// title: "My Post Title"
// date: "2026-08-10"
// excerpt: "One or two sentence summary shown on the blog list page."
// tags: ["tag1", "tag2"]
// type: "blog"            // optional: "blog" | "article" | "research-paper"
// pdf: "/papers/my-paper.pdf"   // optional: link to a PDF (put the file in public/papers/)
// ---
// Markdown body goes here...

const modules = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// Minimal frontmatter parser (avoids pulling in Node-dependent libraries
// like gray-matter, which needs Buffer polyfills in the browser).
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, frontmatterBlock, content] = match;
  const data = {};

  frontmatterBlock.split(/\r?\n/).forEach((line) => {
    const lineMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!lineMatch) return;
    const [, key, rawValue] = lineMatch;
    let value = rawValue.trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      // tags: ["a", "b"]
      value = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }

    data[key] = value;
  });

  return { data, content: content.trim() };
}

function slugify(filePath) {
  const fileName = filePath.split("/").pop().replace(/\.md$/, "");
  return fileName;
}

const posts = Object.entries(modules).map(([filePath, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  return {
    slug: slugify(filePath),
    title: data.title || "Untitled",
    date: data.date || "",
    excerpt: data.excerpt || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    type: data.type || "blog",
    pdf: data.pdf || "",
    content,
  };
});

// Newest first
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}
