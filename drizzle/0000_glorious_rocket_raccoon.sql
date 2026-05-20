CREATE TABLE "alternatives" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" varchar(150) NOT NULL,
	"idQuestions" integer,
	"points" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "answers" (
	"id" integer NOT NULL,
	"idTest" serial PRIMARY KEY NOT NULL,
	"idAlternative" integer NOT NULL,
	"passed" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"active" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"idUser" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "alternatives" ADD CONSTRAINT "alternatives_idQuestions_answers_idTest_fk" FOREIGN KEY ("idQuestions") REFERENCES "public"."answers"("idTest") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_idAlternative_tests_id_fk" FOREIGN KEY ("idAlternative") REFERENCES "public"."tests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tests" ADD CONSTRAINT "tests_idUser_users_id_fk" FOREIGN KEY ("idUser") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;