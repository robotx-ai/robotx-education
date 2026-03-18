import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => ({
  statusCode: 410,
  body: JSON.stringify({
    message: "Signup verification now uses a magic link. Please check your email.",
  }),
});
