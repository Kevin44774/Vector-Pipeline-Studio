import { type User, type InsertUser, type Pipeline, type InsertPipeline } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPipeline(id: string): Promise<Pipeline | undefined>;
  createPipeline(pipeline: InsertPipeline): Promise<Pipeline>;
  updatePipeline(id: string, pipeline: Partial<InsertPipeline>): Promise<Pipeline | undefined>;
  deletePipeline(id: string): Promise<boolean>;
  listPipelines(): Promise<Pipeline[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private pipelines: Map<string, Pipeline>;

  constructor() {
    this.users = new Map();
    this.pipelines = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPipeline(id: string): Promise<Pipeline | undefined> {
    return this.pipelines.get(id);
  }

  async createPipeline(insertPipeline: InsertPipeline): Promise<Pipeline> {
    const id = randomUUID();
    const now = new Date();
    const pipeline: Pipeline = { 
      ...insertPipeline, 
      id, 
      createdAt: now,
      updatedAt: now 
    };
    this.pipelines.set(id, pipeline);
    return pipeline;
  }

  async updatePipeline(id: string, updates: Partial<InsertPipeline>): Promise<Pipeline | undefined> {
    const existing = this.pipelines.get(id);
    if (!existing) return undefined;
    
    const updated: Pipeline = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.pipelines.set(id, updated);
    return updated;
  }

  async deletePipeline(id: string): Promise<boolean> {
    return this.pipelines.delete(id);
  }

  async listPipelines(): Promise<Pipeline[]> {
    return Array.from(this.pipelines.values());
  }
}

export const storage = new MemStorage();
