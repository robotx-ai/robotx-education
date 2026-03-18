import "dotenv/config";
import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

let cachedTransporter: nodemailer.Transporter | null = null;
let verifiedTransporter = false;

function getMailerConfig() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || "587");
  const from = process.env.SMTP_FROM || user;

  if (!user || !pass || !from) {
    throw new Error("Missing SMTP email configuration.");
  }

  if (!Number.isFinite(port)) {
    throw new Error("Invalid SMTP_PORT value.");
  }

  console.info(
    `[mailer] SMTP config host=${host} port=${port} from=${from} user=${user ? "set" : "missing"}`,
  );

  return { user, pass, host, port, from };
}

function getSenderName() {
  return process.env.SMTP_SENDER_NAME;
}

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  const { user, pass, host, port } = getMailerConfig();
  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });
  return cachedTransporter;
}

async function verifyTransporter() {
  if (verifiedTransporter) return;
  const transporter = getTransporter();
  const isReady = await transporter.verify();
  if (!isReady) {
    throw new Error("SMTP verification failed.");
  }
  verifiedTransporter = true;
  console.info("[mailer] SMTP verify ok");
}

export async function sendEmail(payload: EmailPayload) {
  const { from } = getMailerConfig();
  const transporter = getTransporter();
  await verifyTransporter();
  const result = await transporter.sendMail({
    from: `"${getSenderName()}" <${from}>`,
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });
  console.info(
    `[mailer] sendMail messageId=${result.messageId} accepted=${result.accepted?.join(
      ",",
    )} rejected=${result.rejected?.join(",")}`,
  );
  return result;
}

export async function sendTestEmail(to: string) {
  const { from } = getMailerConfig();
  const transporter = getTransporter();
  await verifyTransporter();
  const result = await transporter.sendMail({
    from: `"${getSenderName()}" <${from}>`,
    to,
    subject: "RobotX test email",
    text: "This is a test email from RobotX Education.",
    html: "<p>This is a test email from RobotX Education.</p>",
  });
  console.info(
    `[mailer] test sendMail messageId=${result.messageId} accepted=${result.accepted?.join(
      ",",
    )} rejected=${result.rejected?.join(",")}`,
  );
  return result;
}
