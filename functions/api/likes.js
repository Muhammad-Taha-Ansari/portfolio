// Cloudflare Pages Function — GET /api/likes and POST /api/likes
// Stores a single JSON object of { itemId: count } in a Cloudflare KV
// namespace bound as `env.LIKES` (set up in the Cloudflare Pages dashboard
// under Settings -> Functions -> KV namespace bindings).

const KEY = "counts";

async function readCounts(env) {
  const raw = await env.LIKES.get(KEY);
  return raw ? JSON.parse(raw) : {};
}

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const counts = await readCounts(env);
    return new Response(JSON.stringify(counts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("likes GET error:", err);
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const { id, action } = await request.json();

    if (!id || !["like", "unlike"].includes(action)) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const counts = await readCounts(env);
    const current = counts[id] || 0;
    const updated = action === "like" ? current + 1 : Math.max(0, current - 1);
    counts[id] = updated;

    await env.LIKES.put(KEY, JSON.stringify(counts));

    return new Response(JSON.stringify({ id, count: updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("likes POST error:", err);
    return new Response(JSON.stringify({ error: "Failed to update like." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
