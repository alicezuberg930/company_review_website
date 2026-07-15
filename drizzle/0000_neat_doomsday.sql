CREATE TYPE "public"."company_business_type" AS ENUM('cong-ty-tnhh-1-thanh-vien', 'cong-ty-tnhh-2-thanh-vien-tro-len', 'cong-ty-co-phan', 'doanh-nghiep-tu-nhan', 'cong-ty-hop-doanh', 'ho-kinh-doanh-ca-the', 'cac-to-chuc-kinh-te-khac', 'dn-lien-doanh-voi-nuoc-ngoai', 'to-chuc-ca-nhan-nuoc-ngoai-khac', 'chi-nhanh-dn-nuoc-ngoai', 'cac-co-quan-dai-dien-ngoai-giao-to-chuc-quoc-te-tai-viet-nam', 'dn-100-von-nuoc-ngoai', 'cong-ty-co-phan-nn', 'dn-100-von-nha-nuoc', 'hop-tac-xa', 'don-vi-hanh-chinh-su-nghiep', 'cong-ty-tnhh-nn-1-thanh-vien', 'cong-ty-tnhh-nn-2-tv-tro-len', 'to-hop-tac', 'doanh-nghiep-nha-nuoc-lien-doanh-voi-nuoc-ngoai', 'to-chuc-kinh-te-cua-to-chuc-ct-ct-xh-xh-xh-nn');--> statement-breakpoint
CREATE TYPE "public"."company_status" AS ENUM('ngung-hoat-dong-nhung-chua-hoan-thanh-thu-tuc-dong-mst', 'dang-hoat-dong-duoc-cap-thong-bao-mst', 'dang-hoat-dong', 'tam-nghi-kinh-doanh-co-thoi-han', 'ngung-hoat-dong-va-da-dong-mst', 'da-chuyen-co-quan-thue-quan-ly');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"category_id" varchar(36) NOT NULL,
	"status" "company_status" NOT NULL,
	"business_type" "company_business_type" NOT NULL,
	"tax_code" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"legal_representative" varchar(255) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"managed_by" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"active_date" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint