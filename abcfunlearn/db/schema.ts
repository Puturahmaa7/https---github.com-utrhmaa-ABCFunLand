import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { MAX_HEARTS } from "@/constants";
// db/schema.ts
export const huruf = pgTable("huruf", {
  id: serial("id").primaryKey(),
  huruf: text("huruf").notNull().unique(),
  gambar: text("gambar").notNull(),
  audioSrc: text("audio_src"), // audio huruf
  urutan: integer("urutan").notNull(),
});

export const sukuKata = pgTable("suku_kata", {
  id: serial("id").primaryKey(),
  sukuKata: text("suku_kata").notNull().unique(),
  gambar: text("gambar").notNull(),
  audioSrc: text("audio_src"), // audio suku kata
  hurufId: integer("huruf_id").references(() => huruf.id),
  urutan: integer("urutan").notNull(),
});

export const kata = pgTable("kata", {
  id: serial("id").primaryKey(),
  kata: text("kata").notNull().unique(),
  gambar: text("gambar").notNull(),
  audioSrc: text("audio_src"), // audio kata
  sukuKataId: integer("suku_kata_id").references(() => sukuKata.id),
  urutan: integer("urutan").notNull(),
});

// ===== Unit & Lesson =====
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id").references(() => units.id, {
    onDelete: "cascade",
  }),
  order: integer("order").notNull(),
});

// ===== Challenge / Kuis =====
export const contentTypeEnum = pgEnum("content_type", [
  "huruf",
  "suku_kata",
  "kata",
]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id, {
    onDelete: "cascade",
  }),
  contentType: contentTypeEnum("content_type").notNull(),
  contentId: integer("content_id").notNull(), // hubungkan ke huruf/suku kata/kata sesuai type
  points: integer("points").notNull().default(10),
});

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").references(() => challenges.id, {
    onDelete: "cascade",
  }),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  audioSrc: text("audio_src"), // tambahkan kolom audio
});

// ===== Progress User =====
export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  hearts: integer("hearts").notNull().default(MAX_HEARTS),
  points: integer("points").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  lastActive: timestamp("last_active").defaultNow(),
});

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===== Subscription User =====
export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});

// ===== Shop =====
export const shopItems = pgTable("shop_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // heart | hint | avatar
  price: integer("price").notNull(),
  imageSrc: text("image_src"),
  quantity: integer("quantity").notNull().default(1),
});

export const userInventory = pgTable("user_inventory", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  itemId: integer("item_id").references(() => shopItems.id),
  quantity: integer("quantity").notNull().default(0),
});
