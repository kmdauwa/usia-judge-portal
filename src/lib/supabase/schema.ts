import { integer, text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const entries = pgTable('Entries', {
 entryId: uuid('entry_id').defaultRandom().primaryKey().notNull(),
 createdAt: timestamp('created_at', {
  withTimezone: true,
  mode: 'string',
 }),
 participantId: uuid('participant_id').notNull(),
 regionId: uuid('region_id').notNull().references(()=> regions.regionId),
 majorCategoryId: uuid('major_category_id').notNull().references(()=> majorCategory.majorCategoryId),
 groupClassId: uuid('group_class_id').notNull().references(()=> groupClass.groupClassId),
 ageCategoryId: uuid('age_category_id').notNull().references(()=> ageCategory.ageCategoryId),
 subCategoryId: uuid('sub_category_id').notNull().references(()=>subCategory.subCategoryId),
 timesJudged: integer('times_judged').default(0).notNull(),
 totalScore: integer('total_score').default(0).notNull(),
 averageScore: integer('average_score').default(0).notNull(),
});

export const participants = pgTable('Participants', {
  participantId: uuid('participant_id').defaultRandom().primaryKey().notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  regionId: uuid('region_id').notNull().references(()=> regions.regionId),
  jkName: text('jk_name').notNull()
});

export const regions = pgTable('Regions', {
  regionId: uuid('region_id').defaultRandom().primaryKey().notNull(),
  regionName: text('region_name').notNull()
});

export const majorCategory = pgTable('Major_Category', {
  majorCategoryId: uuid('major_category_id').defaultRandom().primaryKey().notNull(),
  majorCategoryName: text('major_category_name').notNull()
});

export const groupClass = pgTable('Group_Classes', {
  groupClassId: uuid('group_class_id').defaultRandom().primaryKey().notNull(),
  groupClassName: text('group_class_name').notNull()
});

export const ageCategory = pgTable('Age_Category', {
  ageCategoryId: uuid('age_category_id').defaultRandom().primaryKey().notNull(),
  ageCategoryName: text('age_category_name').notNull()
});

export const subCategory = pgTable('Sub_Category', {
  subCategoryId: uuid('sub_category_id').defaultRandom().primaryKey().notNull(),
  subCategoryName: text('sub_category_name').notNull()
});

export const scores = pgTable('Scores', {
  scoreId: uuid('score_id').defaultRandom().primaryKey().notNull(),
  entryId: uuid('entry_id').notNull().references(()=>entries.entryId),
  majorCategoryId: uuid('major_category_id').notNull().references(()=> majorCategory.majorCategoryId),
  judgeId: uuid('judge_id').notNull().references(()=>judges.judgeId),
  score: integer('score').notNull(),
});

export const judges = pgTable('Judges', {
  judgeId: uuid('judges_id').defaultRandom().primaryKey().notNull(),
  judgeName: text('judge_name').notNull(),
  majorCategoryId: uuid('major_category_id').notNull().references(()=> majorCategory.majorCategoryId),
  subCategoryId: uuid('sub_category_id').notNull().references(()=>subCategory.subCategoryId),
});

export const userType = pgTable('User_Type', {
  userTypeId: uuid('user_type_id').defaultRandom().primaryKey().notNull(),
  userTypeName: text('user_type_name').notNull(),
});

export const users = pgTable('Users', {
  userId: uuid('userid').primaryKey().notNull(),
  username: text('username').notNull(),
  userTypeId: uuid('user_type_id').notNull().references(()=>userType.userTypeId),
});


