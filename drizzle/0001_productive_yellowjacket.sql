ALTER TABLE "alternatives" DROP CONSTRAINT "alternatives_idQuestions_answers_idTest_fk";
--> statement-breakpoint
ALTER TABLE "answers" DROP CONSTRAINT "answers_idAlternative_tests_id_fk";
--> statement-breakpoint
ALTER TABLE "alternatives" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "alternatives" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "alternatives_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'answers'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "answers" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "answers" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "answers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "idTest" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "questions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "active" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "tests" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "tests" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "tests_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "alternatives" ADD COLUMN "idQuestion" integer;--> statement-breakpoint
ALTER TABLE "alternatives" ADD CONSTRAINT "alternatives_idQuestion_questions_id_fk" FOREIGN KEY ("idQuestion") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_idAlternative_alternatives_id_fk" FOREIGN KEY ("idAlternative") REFERENCES "public"."alternatives"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_idTest_tests_id_fk" FOREIGN KEY ("idTest") REFERENCES "public"."tests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alternatives" DROP COLUMN "idQuestions";