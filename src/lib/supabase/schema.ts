import { integer, text, timestamp, pgTable, uuid, serial } from "drizzle-orm/pg-core";

export const entries = pgTable("Entries", {
	entryId: uuid("entryid").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("createdat", { withTimezone: true, mode: 'string' }),
	participantId: uuid("participantid").notNull(),
	regionId: integer("regionid").notNull().references(() => regions.regionId),
	majorCategoryId: integer("majorcategoryid").notNull().references(() => majorCategory.majorCategoryId),
	groupClassId: integer("groupclassid").notNull().references(() => groupClasses.groupClassId),
	ageCategoryId: integer("agecategoryid").notNull().references(() => ageCategory.ageCategoryId),
	subCategoryId: integer("subcategoryid").notNull().references(() => subCategory.subCategoryId),
	timesJudged: integer("timesjudged").default(0).notNull(),
	totalScore: integer("totalscore").default(0).notNull(),
	averageScore: integer("averagescore").default(0).notNull(),
});

export const ageCategory = pgTable("AgeCategory", {
	ageCategoryId: serial("agecategoryid").primaryKey().notNull(),
	ageCategoryName: text("agecategoryname").notNull(),
});

export const groupClasses = pgTable("GroupClasses", {
	groupClassId: serial("groupclassid").primaryKey().notNull(),
	groupClassName: text("groupclassname").notNull(),
});

export const judges = pgTable("Judges", {
	judgesId: uuid("judgesid").defaultRandom().primaryKey().notNull(),
	judgeEmail: text("email").notNull(),
	judgeName: text("judgename").notNull(),
	majorCategoryId: integer("majorcategoryid").notNull().references(() => majorCategory.majorCategoryId),
	subCategoryId: integer("subcategoryid").notNull().references(() => subCategory.subCategoryId),
});

export const majorCategory = pgTable("MajorCategory", {
	majorCategoryId: serial("majorcategoryid").primaryKey().notNull(),
	majorCategoryName: text("majorcategoryname").notNull(),
});

export const participants = pgTable("Participants", {
	participantId: uuid("participantid").defaultRandom().primaryKey().notNull(),
	firstName: text("firstname").notNull(),
	lastName: text("lastname").notNull(),
	regionId: integer("regionid").notNull().references(() => regions.regionId),
	jkName: text("jkname").notNull(),
});

export const regions = pgTable("Regions", {
	regionId: serial("regionid").primaryKey().notNull(),
	regionName: text("regionname").notNull(),
});

export const scores = pgTable("Scores", {
	scoreId: uuid("scoreid").defaultRandom().primaryKey().notNull(),
	entryId: uuid("entryid").notNull().references(() => entries.entryId),
	majorCategoryId: integer("majorcategoryid").notNull().references(() => majorCategory.majorCategoryId),
	judgeId: uuid("judgeid").notNull().references(() => judges.judgesId),
	score: integer("score").notNull(),
});

export const subCategory = pgTable("SubCategory", {
	subCategoryId: serial("subcategoryid").primaryKey().notNull(),
	subCategoryName: text("subcategoryname").notNull(),
});

export const userType = pgTable("UserType", {
	userTypeId: serial("usertype_id").primaryKey().notNull(),
	userTypeName: text("usertype_name").notNull(),
});

export const users = pgTable("Users", {
	userid: uuid("userid").primaryKey().notNull(),
	username: text("username").notNull(),
	userTypeId: integer("usertypeid").notNull().references(() => userType.userTypeId),
});


