/** @type {import("drizzle-kit").Config} **/
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  dbCredentials: {
    url: "postgresql://Ai-Content-Generator_owner:KCrViq36ajmP@ep-square-flower-a1ne9cfy.ap-southeast-1.aws.neon.tech/Ai-Content-Generator?sslmode=require",
  },
});
