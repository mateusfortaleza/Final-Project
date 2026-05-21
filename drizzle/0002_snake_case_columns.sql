ALTER TABLE "alternatives" DROP CONSTRAINT IF EXISTS "alternatives_idQuestion_questions_id_fk";
--> statement-breakpoint
ALTER TABLE "answers" DROP CONSTRAINT IF EXISTS "answers_idAlternative_alternatives_id_fk";
--> statement-breakpoint
ALTER TABLE "answers" DROP CONSTRAINT IF EXISTS "answers_idTest_tests_id_fk";
--> statement-breakpoint
ALTER TABLE "tests" DROP CONSTRAINT IF EXISTS "tests_idUser_users_id_fk";
--> statement-breakpoint
ALTER TABLE "alternatives" RENAME COLUMN "idQuestion" TO "id_question";
--> statement-breakpoint
ALTER TABLE "alternatives" RENAME COLUMN "points" TO "passes";
--> statement-breakpoint
ALTER TABLE "answers" RENAME COLUMN "idAlternative" TO "id_alternative";
--> statement-breakpoint
ALTER TABLE "answers" RENAME COLUMN "idTest" TO "id_test";
--> statement-breakpoint
ALTER TABLE "answers" RENAME COLUMN "passed" TO "points";
--> statement-breakpoint
ALTER TABLE "tests" RENAME COLUMN "idUser" TO "id_user";
--> statement-breakpoint
ALTER TABLE "alternatives" ADD CONSTRAINT "alternatives_id_question_questions_id_fk" FOREIGN KEY ("id_question") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_id_alternative_alternatives_id_fk" FOREIGN KEY ("id_alternative") REFERENCES "public"."alternatives"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_id_test_tests_id_fk" FOREIGN KEY ("id_test") REFERENCES "public"."tests"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "tests" ADD CONSTRAINT "tests_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
