import express from "express";
import { IStorage } from "./storage.js";
import { insertProjectSchema, insertProfileSchema, insertSkillCategorySchema } from "../shared/schema.js";

export function createRoutes(storage: IStorage) {
  const router = express.Router();

  // Projects routes
  router.get("/api/projects", async (req, res) => {
    try {
      const { category, featured } = req.query;
      
      let projects;
      if (category) {
        projects = await storage.getProjectsByCategory(category as string);
      } else if (featured === 'true') {
        projects = await storage.getFeaturedProjects();
      } else {
        projects = await storage.getAllProjects();
      }
      
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  router.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  router.post("/api/projects", async (req, res) => {
    try {
      const validated = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validated);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create project" });
      }
    }
  });

  router.patch("/api/projects/:id", async (req, res) => {
    try {
      const validated = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.id, validated);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update project" });
      }
    }
  });

  router.delete("/api/projects/:id", async (req, res) => {
    try {
      const success = await storage.deleteProject(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Profile routes
  router.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfile();
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  router.patch("/api/profile", async (req, res) => {
    try {
      const validated = insertProfileSchema.parse(req.body);
      const profile = await storage.updateProfile(validated);
      res.json(profile);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update profile" });
      }
    }
  });

  // Skills routes
  router.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getAllSkillCategories();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  router.post("/api/skills", async (req, res) => {
    try {
      const validated = insertSkillCategorySchema.parse(req.body);
      const skill = await storage.createSkillCategory(validated);
      res.status(201).json(skill);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create skill category" });
      }
    }
  });

  router.patch("/api/skills/:id", async (req, res) => {
    try {
      const validated = insertSkillCategorySchema.partial().parse(req.body);
      const skill = await storage.updateSkillCategory(req.params.id, validated);
      if (!skill) {
        return res.status(404).json({ error: "Skill category not found" });
      }
      res.json(skill);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update skill category" });
      }
    }
  });

  router.delete("/api/skills/:id", async (req, res) => {
    try {
      const success = await storage.deleteSkillCategory(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Skill category not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete skill category" });
    }
  });

  return router;
}