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

/*
// Ambil challenge random per content type
export const getRandomChallenge = async (
  contentType: "huruf" | "suku_kata" | "kata",
  lessonId: number | null = null
) => {
  let table;
  if (contentType === "huruf") table = huruf;
  if (contentType === "suku_kata") table = sukuKata;
  if (contentType === "kata") table = kata;

  // Ambil satu materi random
  const [randomItem] = await db
    .select()
    .from(table)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  if (!randomItem) return null;

  // Buat challenge baru
  const [challenge] = await db
    .insert(challenges)
    .values({
      lessonId,
      contentType,
      contentId: randomItem.id,
      points: 10,
    })
    .returning();

  // Opsi jawaban: 1 benar + 3 salah random
  const correctText =
    contentType === "huruf"
      ? randomItem.huruf
      : contentType === "suku_kata"
      ? randomItem.sukuKata
      : randomItem.kata;

  const incorrect = await db
    .select()
    .from(table)
    .whereNot(eq(table.id, randomItem.id))
    .orderBy(sql`RANDOM()`)
    .limit(3);

  const options = [
    { text: correctText, correct: true, audioSrc: randomItem.audioSrc },
    ...incorrect.map((i) => ({
      text:
        contentType === "huruf"
          ? i.huruf
          : contentType === "suku_kata"
          ? i.sukuKata
          : i.kata,
      correct: false,
      audioSrc: i.audioSrc,
    })),
  ];

  // Simpan opsi challenge
  for (const opt of options) {
    await db.insert(challengeOptions).values({
      challengeId: challenge.id,
      text: opt.text,
      correct: opt.correct,
      audioSrc: opt.audioSrc,
    });
  }

  return challenge;
};*/
