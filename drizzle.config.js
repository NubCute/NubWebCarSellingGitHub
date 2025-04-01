import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_IHgud7GhDk0W@ep-gentle-bonus-a5pfb7lb-pooler.us-east-2.aws.neon.tech/nub-webcarselling?sslmode=require",
    }
})