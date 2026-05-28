import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mock_interviews',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition',{length:255}).notNull(),
    jobDesc:varchar('jobDesc',{length:255}).notNull(),
    jobExperience:varchar('jobExperience',{length:255}).notNull(),
    createdBy:varchar('createdBy',{length:255}).notNull(),
    createdAt:timestamp('createdAt').defaultNow(),
    mockId:varchar('mockId',{length:255}).notNull()
});


export const UserAnswer = pgTable('user_answers',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockIdRef',{length:255}).notNull(),
    question:varchar('question',{length:255}).notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating',{length:255}),
    userEmail:varchar('userEmail',{length:255}).notNull(),
    createdAt:varchar('createdAt',{length:255}),
});