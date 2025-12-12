import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import "dotenv/config";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  // Shield protects your app from common attacks e.g. SQL injection
  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      // Block all bots except
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    // rate limit
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});
