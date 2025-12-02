import { User, Chat, Message, Call, Status } from "@/types/chat";
import { generateId } from "./storage";

export const PRESET_AVATARS = [0, 1, 2, 3, 4, 5];

export const AVATAR_COLORS = [
  "#25D366",
  "#128C7E",
  "#075E54",
  "#34B7F1",
  "#00A884",
  "#667781",
];

export function getAvatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const mockContacts: User[] = [
  {
    id: "contact_1",
    name: "Ahmed Mohamed",
    avatar: 0,
    status: "Available",
    phone: "+20 100 123 4567",
    isOnline: true,
  },
  {
    id: "contact_2",
    name: "Fatima Hassan",
    avatar: 1,
    status: "Busy",
    phone: "+20 101 234 5678",
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000),
  },
  {
    id: "contact_3",
    name: "Omar Ali",
    avatar: 2,
    status: "At work",
    phone: "+20 102 345 6789",
    isOnline: true,
  },
  {
    id: "contact_4",
    name: "Sara Ibrahim",
    avatar: 3,
    status: "Hey there! I am using ChatApp",
    phone: "+20 103 456 7890",
    isOnline: false,
    lastSeen: new Date(Date.now() - 7200000),
  },
  {
    id: "contact_5",
    name: "Youssef Khaled",
    avatar: 4,
    status: "In a meeting",
    phone: "+20 104 567 8901",
    isOnline: false,
    lastSeen: new Date(Date.now() - 86400000),
  },
  {
    id: "contact_6",
    name: "Nour Hassan",
    avatar: 5,
    status: "Available",
    phone: "+20 105 678 9012",
    isOnline: true,
  },
];

export function createMockChats(userId: string): Chat[] {
  const now = new Date();
  return [
    {
      id: "chat_1",
      type: "individual",
      participants: [userId, "contact_1"],
      unreadCount: 2,
      createdAt: new Date(now.getTime() - 86400000 * 7),
      updatedAt: new Date(now.getTime() - 60000),
      lastMessage: {
        id: "msg_1",
        chatId: "chat_1",
        senderId: "contact_1",
        text: "See you tomorrow!",
        timestamp: new Date(now.getTime() - 60000),
        status: "delivered",
      },
    },
    {
      id: "chat_2",
      type: "individual",
      participants: [userId, "contact_2"],
      unreadCount: 0,
      createdAt: new Date(now.getTime() - 86400000 * 3),
      updatedAt: new Date(now.getTime() - 3600000),
      lastMessage: {
        id: "msg_2",
        chatId: "chat_2",
        senderId: userId,
        text: "Thanks for the help!",
        timestamp: new Date(now.getTime() - 3600000),
        status: "read",
      },
    },
    {
      id: "chat_3",
      type: "group",
      participants: [userId, "contact_1", "contact_3", "contact_4"],
      name: "Project Team",
      avatar: 2,
      unreadCount: 5,
      createdAt: new Date(now.getTime() - 86400000 * 14),
      updatedAt: new Date(now.getTime() - 1800000),
      lastMessage: {
        id: "msg_3",
        chatId: "chat_3",
        senderId: "contact_3",
        text: "Meeting at 3 PM",
        timestamp: new Date(now.getTime() - 1800000),
        status: "delivered",
      },
    },
    {
      id: "chat_4",
      type: "individual",
      participants: [userId, "contact_5"],
      unreadCount: 0,
      createdAt: new Date(now.getTime() - 86400000 * 2),
      updatedAt: new Date(now.getTime() - 86400000),
      lastMessage: {
        id: "msg_4",
        chatId: "chat_4",
        senderId: "contact_5",
        text: "Good morning!",
        timestamp: new Date(now.getTime() - 86400000),
        status: "read",
      },
    },
    {
      id: "chat_5",
      type: "group",
      participants: [userId, "contact_2", "contact_6"],
      name: "Family",
      avatar: 1,
      unreadCount: 1,
      createdAt: new Date(now.getTime() - 86400000 * 30),
      updatedAt: new Date(now.getTime() - 7200000),
      lastMessage: {
        id: "msg_5",
        chatId: "chat_5",
        senderId: "contact_6",
        text: "Happy birthday!",
        timestamp: new Date(now.getTime() - 7200000),
        status: "delivered",
      },
    },
  ];
}

export function createMockMessages(
  chatId: string,
  userId: string,
  otherUserId: string
): Message[] {
  const now = new Date();
  const messages: Message[] = [];
  const baseTime = now.getTime() - 3600000 * 24;

  const conversations = [
    { sender: otherUserId, text: "Hello! How are you?" },
    { sender: userId, text: "Hi! I'm doing great, thanks for asking." },
    { sender: otherUserId, text: "That's wonderful to hear!" },
    { sender: userId, text: "How about you?" },
    { sender: otherUserId, text: "I'm good too. Just finished work." },
    { sender: userId, text: "Nice! Any plans for the evening?" },
    { sender: otherUserId, text: "Not really, maybe watch a movie." },
    { sender: userId, text: "Sounds relaxing!" },
    { sender: otherUserId, text: "Yes, I need some rest." },
    { sender: userId, text: "Take care then!" },
    { sender: otherUserId, text: "Thanks! Talk to you later." },
    { sender: userId, text: "See you!" },
  ];

  conversations.forEach((conv, index) => {
    messages.push({
      id: generateId(),
      chatId,
      senderId: conv.sender,
      text: conv.text,
      timestamp: new Date(baseTime + index * 120000),
      status: conv.sender === userId ? "read" : "delivered",
    });
  });

  return messages;
}

export function createMockCalls(): Call[] {
  const now = new Date();
  return [
    {
      id: "call_1",
      participantId: "contact_1",
      type: "voice",
      direction: "incoming",
      status: "answered",
      timestamp: new Date(now.getTime() - 3600000),
      duration: 320,
    },
    {
      id: "call_2",
      participantId: "contact_2",
      type: "video",
      direction: "outgoing",
      status: "answered",
      timestamp: new Date(now.getTime() - 86400000),
      duration: 1245,
    },
    {
      id: "call_3",
      participantId: "contact_3",
      type: "voice",
      direction: "incoming",
      status: "missed",
      timestamp: new Date(now.getTime() - 86400000 * 2),
    },
    {
      id: "call_4",
      participantId: "contact_4",
      type: "video",
      direction: "outgoing",
      status: "missed",
      timestamp: new Date(now.getTime() - 86400000 * 3),
    },
    {
      id: "call_5",
      participantId: "contact_1",
      type: "voice",
      direction: "outgoing",
      status: "answered",
      timestamp: new Date(now.getTime() - 86400000 * 4),
      duration: 560,
    },
  ];
}

export function createMockStatuses(): Status[] {
  const now = new Date();
  return [
    {
      id: "status_1",
      userId: "contact_1",
      content: "Having a great day!",
      timestamp: new Date(now.getTime() - 3600000),
      views: [],
      expiresAt: new Date(now.getTime() + 86400000 - 3600000),
    },
    {
      id: "status_2",
      userId: "contact_3",
      content: "Working on a new project",
      timestamp: new Date(now.getTime() - 7200000),
      views: [],
      expiresAt: new Date(now.getTime() + 86400000 - 7200000),
    },
    {
      id: "status_3",
      userId: "contact_6",
      content: "Beautiful sunset today!",
      timestamp: new Date(now.getTime() - 14400000),
      views: [],
      expiresAt: new Date(now.getTime() + 86400000 - 14400000),
    },
  ];
}
