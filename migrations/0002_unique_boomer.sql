CREATE TABLE IF NOT EXISTS "Age_Category" (
	"age_category_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"age_category_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Group_Classes" (
	"group_class_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_class_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Judges" (
	"judges_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"judge_name" text NOT NULL,
	"major_category_id" uuid NOT NULL,
	"sub_category_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Major_Category" (
	"major_category_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"major_category_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Participants" (
	"participant_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"region_id" uuid NOT NULL,
	"jk_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Regions" (
	"region_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"region_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Scores" (
	"score_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entry_id" uuid NOT NULL,
	"major_category_id" uuid NOT NULL,
	"judge_id" uuid NOT NULL,
	"score" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Sub_Category" (
	"sub_category_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sub_category_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User_Type" (
	"user_type_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_type_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"userid" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"user_type_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Entries" RENAME COLUMN "entries_id" TO "entry_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Entries" ADD CONSTRAINT "Entries_region_id_Regions_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "Regions"("region_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Entries" ADD CONSTRAINT "Entries_major_category_id_Major_Category_major_category_id_fk" FOREIGN KEY ("major_category_id") REFERENCES "Major_Category"("major_category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Entries" ADD CONSTRAINT "Entries_group_class_id_Group_Classes_group_class_id_fk" FOREIGN KEY ("group_class_id") REFERENCES "Group_Classes"("group_class_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Entries" ADD CONSTRAINT "Entries_age_category_id_Age_Category_age_category_id_fk" FOREIGN KEY ("age_category_id") REFERENCES "Age_Category"("age_category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Entries" ADD CONSTRAINT "Entries_sub_category_id_Sub_Category_sub_category_id_fk" FOREIGN KEY ("sub_category_id") REFERENCES "Sub_Category"("sub_category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Judges" ADD CONSTRAINT "Judges_major_category_id_Major_Category_major_category_id_fk" FOREIGN KEY ("major_category_id") REFERENCES "Major_Category"("major_category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Judges" ADD CONSTRAINT "Judges_sub_category_id_Sub_Category_sub_category_id_fk" FOREIGN KEY ("sub_category_id") REFERENCES "Sub_Category"("sub_category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Participants" ADD CONSTRAINT "Participants_region_id_Regions_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "Regions"("region_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Scores" ADD CONSTRAINT "Scores_entry_id_Entries_entry_id_fk" FOREIGN KEY ("entry_id") REFERENCES "Entries"("entry_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Scores" ADD CONSTRAINT "Scores_major_category_id_Major_Category_major_category_id_fk" FOREIGN KEY ("major_category_id") REFERENCES "Major_Category"("major_category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Scores" ADD CONSTRAINT "Scores_judge_id_Judges_judges_id_fk" FOREIGN KEY ("judge_id") REFERENCES "Judges"("judges_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Users" ADD CONSTRAINT "Users_user_type_id_User_Type_user_type_id_fk" FOREIGN KEY ("user_type_id") REFERENCES "User_Type"("user_type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
