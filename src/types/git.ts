import type { User } from "./auth";

export interface gitRepository {
    id?: string | null;
    name: string | null;
    description: string | null;
    isPublic: boolean | null;
    hasReadme: boolean | null;
    user: User | null;
    updatedAt: Date | null;
    createdAt: Date | null;
}

export interface createRepository {
    repoName?: string;
    isPrivate?: boolean;
    username?: string | null;
    defaultBranch?: string | null;
}
