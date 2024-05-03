import { InvitationsType } from "@prisma/client"

export interface CreateInvitation {
  senderEmail: string;
  senderNickname: string;
  receiverEmail: string;
  type: InvitationsType;
  groupId?: number;
  eventId?: number;
}

export interface createInvitationGroups {
  senderEmail: string;
  senderNickname: string;
  receiverEmail: string;
  groupId: number;
}

export interface AcceptInvitationPayload {
  invitationId: number;
  targetId: number;
}