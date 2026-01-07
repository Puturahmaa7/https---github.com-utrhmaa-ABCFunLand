import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { MAX_HEARTS } from "@/constants";

export const courses = pgTable("huruf", {
  id: serial("id").primaryKey(),
  huruf: text("title").notNull(),
  gambar: text("image_src").notNull(),
});

export const sukuKata = pgTable("sukuKata", {
  id: serial("id").primaryKey(),
  sukuKata: text("title").notNull(),
  gambar: text("image_src").notNull(),
});

export const kata = pgTable("kata", {
  id: serial("id").primaryKey(),
  kata: text("title").notNull(),
  gambar: text("image_src").notNull(),
});
