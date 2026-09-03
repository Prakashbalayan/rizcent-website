import { prisma } from "@/lib/prisma";

interface RateLimitOptions {
  key: string;
  limit: number;
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export async function checkRateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  const now = new Date();

  const existing = await prisma.rateLimit.findUnique({
    where: {
      key,
    },
  });

  /*
   * No previous requests for this key.
   * Create a fresh rate-limit window.
   */
  if (!existing) {
    await prisma.rateLimit.create({
      data: {
        key,
        count: 1,
        windowStart: now,
      },
    });

    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      retryAfterSeconds: 0,
    };
  }

  const windowEnd = new Date(
    existing.windowStart.getTime() + windowMs,
  );

  /*
   * Existing window has expired.
   * Start a completely new window.
   */
  if (now >= windowEnd) {
    await prisma.rateLimit.update({
      where: {
        id: existing.id,
      },
      data: {
        count: 1,
        windowStart: now,
      },
    });

    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      retryAfterSeconds: 0,
    };
  }

  /*
   * Request is inside the current window.
   */
  if (existing.count >= limit) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil(
        (windowEnd.getTime() - now.getTime()) / 1000,
      ),
    );

    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  /*
   * Increment the request count.
   */
  const updated = await prisma.rateLimit.update({
    where: {
      id: existing.id,
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });

  return {
    allowed: true,
    remaining: Math.max(
      limit - updated.count,
      0,
    ),
    retryAfterSeconds: 0,
  };
}

export async function clearRateLimit(key: string) {
  await prisma.rateLimit.deleteMany({
    where: {
      key,
    },
  });
}

export async function cleanupExpiredRateLimits(
  windowMs: number,
) {
  const cutoff = new Date(
    Date.now() - windowMs,
  );

  await prisma.rateLimit.deleteMany({
    where: {
      windowStart: {
        lt: cutoff,
      },
    },
  });
}