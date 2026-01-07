import db from "./drizzle";
import { eq, and, sql, desc } from "drizzle-orm";

import {
  userProgress,
  userSubscription, // <-- tambahkan ini
  challenges,
  challengeOptions,
  challengeProgress,
  huruf,
  sukuKata,
  kata,
} from "./schema";

export const getUserProgress = async (userId: string) => {
  return await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
  });
};

export const getUserSubscription = async (userId: string) => {
  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });

  if (!data) return null;

  // Konversi string timestamp ke Date
  const stripeEnd = new Date(data.stripeCurrentPeriodEnd);

  const isActive = stripeEnd.getTime() > Date.now();

  return { ...data, isActive };
};

// Ambil progress user

// Tandai challenge selesai & update poin
export const markChallengeCompleted = async (
  userId: string,
  challengeId: number
) => {
  // Cek progress
  const existing = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  if (existing) {
    await db
      .update(challengeProgress)
      .set({ completed: true })
      .where(eq(challengeProgress.id, existing.id));
  } else {
    await db
      .insert(challengeProgress)
      .values({ userId, challengeId, completed: true });
  }

  // Tambahkan poin ke user
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });
  if (!challenge) return;

  const user = await getUserProgress(userId);
  if (!user) return;

  await db
    .update(userProgress)
    .set({ points: user.points + challenge.points })
    .where(eq(userProgress.userId, userId));
};

// Leaderboard: user dengan points tertinggi
export const getLeaderboard = async (limit = 10) => {
  return await db.query.userProgress.findMany({
    orderBy: (u) => [desc(u.points)],
    limit,
  });
};

export const getHurufByHuruf = async (hurufChar: string) => {
  return await db.query.huruf.findFirst({
    where: eq(huruf.huruf, hurufChar),
  });
};
