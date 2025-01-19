import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aiOutput', {
  id: serial('id').primaryKey(),
  formData: varchar('formData').notNull(),
  aiResponse: text('aiResponse'),
  templateSlug: varchar('templateSlug').notNull(),
  createdBy: varchar('email').notNull(),
  createdAt: timestamp('createdAt')  // Change here to timestamp
});
