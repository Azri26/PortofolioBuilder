import { z } from "zod";

// Portfolio projects schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(['data-science', 'power-bi', 'web-development', 'analytics', 'machine-learning']),
  technologies: z.array(z.string()),
  imageUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  powerBiUrl: z.string().optional(),
  featured: z.boolean().default(false),
  content: z.string(),
  metrics: z.record(z.any()).optional(), // For storing project metrics/results
  createdAt: z.date().default(() => new Date()),
});

// Profile/About information schema
export const profileSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(), // e.g., "Data Scientist"
  bio: z.string(),
  email: z.string().email().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  profileImageUrl: z.string().optional(),
  resumeUrl: z.string().optional(),
  skills: z.array(z.string()),
  updatedAt: z.date().default(() => new Date()),
});

// Skills categories schema
export const skillCategorySchema = z.object({
  id: z.string(),
  name: z.string(), // e.g., "Data Science", "Visualization", "Programming"
  skills: z.array(z.string()),
  color: z.string().default("#3b82f6"), // Hex color for category
});

// Insert schemas (omitting auto-generated fields)
export const insertProjectSchema = projectSchema.omit({
  id: true,
  createdAt: true,
});

export const insertProfileSchema = profileSchema.omit({
  id: true,
  updatedAt: true,
});

export const insertSkillCategorySchema = skillCategorySchema.omit({
  id: true,
});

// Types
export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Profile = z.infer<typeof profileSchema>;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type InsertSkillCategory = z.infer<typeof insertSkillCategorySchema>;