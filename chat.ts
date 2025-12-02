export interface User {
  id: string;
  name: string;
  avatar: number;
  status: string;
  phone?: string;
  isOnline?: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

export interface Chat {
  id: string;
  type: "individual" | "group";
  participants: string[];
  name?: string;
  avatar?: number;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Call {
  id: string;
  participantId: string;
  type: "voice" | "video";
  direction: "incoming" | "outgoing";
  status: "missed" | "answered";
  timestamp: Date;
  duration?: number;
}

export interface Status {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  views: string[];
  expiresAt: Date;
}
