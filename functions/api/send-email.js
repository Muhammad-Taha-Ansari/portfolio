import { WorkerMailer } from "worker-mailer";

// Cloudflare Pages Function — handles POST /api/send-email
// This runs server-side (on Cloudflare's edge), so the Gmail App Password
// (env.GMAIL_APP_PASSWORD) never reaches the browser / is never visible
// in the site's JS bundle. It is set as a secret in the Cloudflare Pages
// dashboard, not committed to the repo.
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing name, email, or message." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const mailer = await WorkerMailer.connect({
      credentials: {
        username: env.GMAIL_USER, // e.g. tahaansari@gmail.com
        password: env.GMAIL_APP_PASSWORD, // Gmail App Password (16-char, from 2FA)
      },
      authType: "plain",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    });

    await mailer.send({
      from: { name: "Portfolio Contact Form", email: env.GMAIL_USER },
      to: { name: "Taha", email: env.GMAIL_USER },
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.replace(
        /\n/g,
        "<br/>"
      )}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-email error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send email." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

