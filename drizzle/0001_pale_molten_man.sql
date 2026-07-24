CREATE TABLE "reviews" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"parent_review_id" varchar(36),
	"is_deleted" boolean,
	"company_id" varchar(36) NOT NULL,
	"content" text,
	"score" numeric,
	"display_name" varchar(36),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "email" varchar(255);--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "smallest_size" numeric;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "biggest_size" numeric;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "logo" varchar(255);--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "website" varchar(255);--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "average_score" numeric;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "is_deleted" boolean;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_parent_review_id_reviews_id_fk" FOREIGN KEY ("parent_review_id") REFERENCES "public"."reviews"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;