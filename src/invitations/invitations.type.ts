export interface createInvitation {
  senderEmail: string,
  senderNickname: string,
  receiverEmail: string,
}

export interface createInvitationGroups {
  senderEmail: string,
  senderNickname: string,
  receiverEmail: string,
  groupId: number
}