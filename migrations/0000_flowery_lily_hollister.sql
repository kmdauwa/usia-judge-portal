CREATE TABLE IF NOT EXISTS "Entries" (
	"entries_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"participant_id" uuid NOT NULL,
	"region_id" uuid NOT NULL,
	"major_category_id" uuid NOT NULL,
	"group_class_id" uuid NOT NULL,
	"age_category_id" uuid NOT NULL,
	"sub_category_id" uuid NOT NULL,
	"times_judged" integer DEFAULT 0 NOT NULL,
	"total_score" integer DEFAULT 0 NOT NULL,
	"average_score" integer DEFAULT 0 NOT NULL
);
