export interface Participant {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  exclusions: string[];
}

export interface Event {
  id: string;
  name: string;
  description: string;
  organizerName: string;
  organizerEmail: string;
  giftBudget?: number;
  exchangeDate: Date;
  participants: Participant[];
  assignments?: Assignment[];
  isDrawn: boolean;
  joinCode: string;
  createdAt: Date;
}

export interface Assignment {
  giverId: string;
  receiverId: string;
  giverName: string;
  receiverName: string;
}
