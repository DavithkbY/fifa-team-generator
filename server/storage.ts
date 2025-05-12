import { users, type User, type InsertUser, teamConfigs, type TeamConfig, type InsertTeamConfig } from "@shared/schema";

// Storage interface with CRUD methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Team configuration methods
  createTeamConfig(config: InsertTeamConfig): Promise<TeamConfig>;
  getTeamConfigs(limit?: number): Promise<TeamConfig[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teamConfigs: Map<number, TeamConfig>;
  private userCurrentId: number;
  private teamConfigCurrentId: number;

  constructor() {
    this.users = new Map();
    this.teamConfigs = new Map();
    this.userCurrentId = 1;
    this.teamConfigCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTeamConfig(config: InsertTeamConfig): Promise<TeamConfig> {
    const id = this.teamConfigCurrentId++;
    const createdAt = new Date();
    const teamConfig: TeamConfig = { ...config, id, createdAt };
    this.teamConfigs.set(id, teamConfig);
    return teamConfig;
  }

  async getTeamConfigs(limit: number = 5): Promise<TeamConfig[]> {
    const configs = Array.from(this.teamConfigs.values());
    // Sort by createdAt in descending order (newest first)
    configs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    // Return limited number of configs
    return configs.slice(0, limit);
  }
}

export const storage = new MemStorage();
