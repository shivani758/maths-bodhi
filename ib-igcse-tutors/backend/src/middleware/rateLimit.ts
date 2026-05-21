import type { Request, RequestHandler } from "express";
import { ApiError } from "../utils/ApiError.js";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  keyPrefix: string;
  windowMs: number;
  maxAttempts: number;
  getIdentity?: (req: Request) => string | undefined;
};

const buckets = new Map<string, RateLimitBucket>();
let lastCleanupAt = Date.now();

function cleanupExpiredBuckets(now: number) {
  if (now - lastCleanupAt < 60_000) {
    return;
  }

  lastCleanupAt = now;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

function normalizeKeyPart(value: string | undefined) {
  return String(value ?? "unknown")
    .trim()
    .toLowerCase()
    .slice(0, 120);
}

function getClientIp(req: Request) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

export function createRateLimiter(options: RateLimitOptions): RequestHandler {
  return (req, res, next) => {
    const now = Date.now();
    cleanupExpiredBuckets(now);

    const identity = normalizeKeyPart(options.getIdentity?.(req));
    const key = [options.keyPrefix, normalizeKeyPart(getClientIp(req)), identity].join(":");
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, {
        count: 1,
        resetAt: now + options.windowMs,
      });
      return next();
    }

    if (bucket.count >= options.maxAttempts) {
      const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      res.setHeader("Retry-After", String(retryAfterSeconds));
      return next(
        new ApiError(429, "Too many attempts. Please wait before trying again.", {
          code: "RATE_LIMITED",
        }),
      );
    }

    bucket.count += 1;
    return next();
  };
}
