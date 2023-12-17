import { integer, text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const workspaces = pgTable('Entries', {
 entriesId: uuid('entries_id').defaultRandom().primaryKey().notNull(),
 createdAt: timestamp('created_at', {
  withTimezone: true,
  mode: 'string',
 }),
 participantId: uuid('participant_id').notNull(),
 regionId: uuid('region_id').notNull(),
 majorCategoryId: uuid('major_category_id').notNull(),
 groupClassId: uuid('group_class_id').notNull(),
 ageCategoryId: uuid('age_category_id').notNull(),
 subCategoryId: uuid('sub_category_id').notNull(),
 timesJudged: integer('times_judged').default(0).notNull(),
 totalScore: integer('total_score').default(0).notNull(),
 averageScore: integer('average_score').default(0).notNull(),
});