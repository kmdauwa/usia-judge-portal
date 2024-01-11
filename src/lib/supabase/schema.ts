import { pgTable, pgEnum, serial, text, foreignKey, unique, uuid, integer, smallint, timestamp, real } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])


export const ageCategory = pgTable("AgeCategory", {
	agecategoryid: serial("agecategoryid").primaryKey().notNull(),
	agecategoryname: text("agecategoryname").notNull(),
});

export const scores = pgTable("Scores", {
	scoreid: uuid("scoreid").defaultRandom().primaryKey().notNull(),
	entryid: text("entryid").notNull().references(() => entries.entryid, { onDelete: "cascade", onUpdate: "cascade" } ),
	majorcategoryid: integer("majorcategoryid").notNull().references(() => majorCategory.majorcategoryid),
	judgeid: uuid("judgeid").notNull().references(() => judges.judgeid),
	score: smallint("score").notNull(),
	agCreativityScore: smallint("ag_creativity_score"),
	agCuratorialScore: smallint("ag_curatorial_score"),
	agElementsScore: smallint("ag_elements_score"),
	agTechniqueScore: smallint("ag_technique_score"),
	agAppearanceScore: smallint("ag_appearance_score"),
	ffStorylineScore: smallint("ff_storyline_score"),
	ffDirectionScore: smallint("ff_direction_score"),
	ffEditingScore: smallint("ff_editing_score"),
	ffSoundScore: smallint("ff_sound_score"),
	ffCinematographyScore: smallint("ff_cinematography_score"),
	ffPerformanceScore: smallint("ff_performance_score"),
	ffVisualScore: smallint("ff_visual_score"),
	ffSpecialScore: smallint("ff_special_score"),
	paTechniqueScore: smallint("pa_technique_score"),
	paQualityScore: smallint("pa_quality_score"),
	paCreativityScore: smallint("pa_creativity_score"),
	paMusicalityScore: smallint("pa_musicality_score"),
	paOverallScore: smallint("pa_overall_score"),
	createdAt: timestamp("createdAt", { mode: 'string' }).default((now() AT TIME ZONE 'cst'::text)),
},
(table) => {
	return {
		entryidjudgeidKey: unique("entryidjudgeid_key").on(table.entryid, table.judgeid),
	}
});

export const groupClasses = pgTable("GroupClasses", {
	groupclassid: serial("groupclassid").primaryKey().notNull(),
	groupclassname: text("groupclassname").notNull(),
});

export const majorCategory = pgTable("MajorCategory", {
	majorcategoryid: serial("majorcategoryid").primaryKey().notNull(),
	majorcategoryname: text("majorcategoryname").notNull(),
});

export const regions = pgTable("Regions", {
	regionid: serial("regionid").primaryKey().notNull(),
	regionname: text("regionname").notNull(),
});

export const judges = pgTable("Judges", {
	judgeid: uuid("judgeid").defaultRandom().primaryKey().notNull(),
	email: text("email").notNull(),
	majorcategoryid: integer("majorcategoryid").notNull().references(() => majorCategory.majorcategoryid),
	firstname: text("firstname"),
	lastname: text("lastname"),
	phonenumber: text("phonenumber"),
	eventjudgeid: smallint("eventjudgeid"),
});

export const participants = pgTable("Participants", {
	participantid: text("participantid").primaryKey().notNull(),
	firstname: text("firstname").notNull(),
	lastname: text("lastname").notNull(),
	regionid: integer("regionid").notNull().references(() => regions.regionid),
});

export const subCategory = pgTable("SubCategory", {
	subcategoryid: serial("subcategoryid").primaryKey().notNull(),
	subcategoryname: text("subcategoryname").notNull(),
	majorcategoryid: integer("majorcategoryid").references(() => majorCategory.majorcategoryid, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const userType = pgTable("UserType", {
	usertypeId: serial("usertype_id").primaryKey().notNull(),
	usertypeName: text("usertype_name").notNull(),
});

export const users = pgTable("Users", {
	userid: uuid("userid").primaryKey().notNull(),
	username: text("username").notNull(),
	usertypeid: integer("usertypeid").notNull().references(() => userType.usertypeId),
});

export const entries = pgTable("Entries", {
	entryid: text("entryid").primaryKey().notNull(),
	createdat: timestamp("createdat", { withTimezone: true, mode: 'string' }).defaultNow(),
	participantid: text("participantid").notNull().references(() => participants.participantid),
	regionid: integer("regionid").notNull().references(() => regions.regionid),
	majorcategoryid: integer("majorcategoryid").notNull().references(() => majorCategory.majorcategoryid),
	groupclassid: integer("groupclassid").notNull().references(() => groupClasses.groupclassid),
	agecategoryid: integer("agecategoryid").notNull().references(() => ageCategory.agecategoryid),
	subcategoryid: integer("subcategoryid").notNull().references(() => subCategory.subcategoryid),
	timesjudged: integer("timesjudged").default(0),
	totalscore: integer("totalscore").default(0),
	averagescore: real("averagescore"),
	teamname: text("teamname"),
	numofparticipants: integer("numofparticipants"),
	title: text("title"),
	agCreativityTotal: smallint("ag_creativity_total"),
	agCuratorialTotal: smallint("ag_curatorial_total"),
	agElementsTotal: smallint("ag_elements_total"),
	agTechniqueTotal: smallint("ag_technique_total"),
	agAppearanceTotal: smallint("ag_appearance_total"),
	ffStorylineTotal: smallint("ff_storyline_total"),
	ffDirectionTotal: smallint("ff_direction_total"),
	ffEditingTotal: smallint("ff_editing_total"),
	ffSoundTotal: smallint("ff_sound_total"),
	ffCinematographyTotal: smallint("ff_cinematography_total"),
	ffPerformanceTotal: smallint("ff_performance_total"),
	ffVisualTotal: smallint("ff_visual_total"),
	ffSpecialTotal: smallint("ff_special_total"),
	paTechniqueTotal: smallint("pa_technique_total"),
	paQualityTotal: smallint("pa_quality_total"),
	paCreativityTotal: smallint("pa_creativity_total"),
	paMusicalityTotal: smallint("pa_musicality_total"),
	paOverallTotal: smallint("pa_overall_total"),
});