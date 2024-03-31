import { Groups, Users } from "@prisma/client";

export interface CreateGameEventPayload {
  title: string;
  description: string;
  date: Date,
  invitedUsersEmail: string[];
  participants: Users[];
  group: Groups
}