
export interface CreateGameEventPayload {
  title: string;
  description: string;
  date: Date,
  invitedUsersEmail: string[];
  participantId: number;
  groupId: number;
}