const express = require("express");
const nodemailer = require("nodemailer");
const { rateLimit } = require("express-rate-limit");
const path = require("path");

const app = express();
const port = Number(process.env.PORT) || 3000;
const contactTo = process.env.CONTACT_TO || "scpenney2@gmail.com";
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again later." },
});
const requiredEnvironment = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"];
const missingEnvironment = requiredEnvironment.filter(
  (name) => !process.env[name],
);

const mailer = missingEnvironment.length
  ? null
  : nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "..")));

app.post("/api/contact", contactRateLimit, async (request, response) => {
  const {
    "sender-email": senderEmail,
    "message-subject": subject,
    "message-body": message,
  } = request.body;

  if (!mailer) {
    return response.status(503).json({
      error: "Email service is not configured yet.",
    });
  }

  if (
    typeof senderEmail !== "string" ||
    !/^\S+@\S+\.\S+$/.test(senderEmail) ||
    typeof subject !== "string" ||
    !subject.trim() ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return response.status(400).json({ error: "Please complete every field." });
  }

  try {
    await mailer.sendMail({
      from: process.env.SMTP_USER,
      to: contactTo,
      replyTo: senderEmail,
      subject: subject.trim(),
      text: message.trim(),
    });
    return response.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact email failed:", error.message);
    return response.status(502).json({ error: "Unable to send your message." });
  }
});

app.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});
