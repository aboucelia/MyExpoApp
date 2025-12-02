import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Chat, Message, Call, Status } from "@/types/chat";
import { storage, generateId } from "@/utils/storage";
import {
  mockContacts,
  createMockChats,
  createMockMessages,
  createMockCalls,
  createMockStatuses,
} from "@/utils/mockData";

interface AuthContextType {
  user: User | null;
  contacts: User[];
  chats: Chat[];
  calls: Call[];
  statuses: Status[];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (name: string, avatar: number) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  getMessages: (chatId: string) => Promise<Message[]>;
  sendMessage: (chatId: string, text: string) => Promise<void>;
  createChat: (participantIds: string[], groupName?: string) => Promise<Chat>;
  markChatAsRead: (chatId: string) => void;
  getContactById: (id: string) => User | undefined;
  getChatParticipants: (chat: Chat) => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [contacts, setContacts] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const savedUser = await storage.getUser();
      if (savedUser) {
        setUser(savedUser);
        const savedContacts = await storage.getContacts();
        setContacts(savedContacts.length > 0 ? savedContacts : mockContacts);
        const savedChats = await storage.getChats();
        setChats(
          savedChats.length > 0 ? savedChats : createMockChats(savedUser.id)
        );
        const savedCalls = await storage.getCalls();
        setCalls(savedCalls.length > 0 ? savedCalls : createMockCalls());
        const savedStatuses = await storage.getStatuses();
        setStatuses(
          savedStatuses.length > 0 ? savedStatuses : createMockStatuses()
        );
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(name: string, avatar: number) {
    const newUser: User = {
      id: generateId(),
      name,
      avatar,
      status: "Hey there! I am using ChatApp",
    };
    await storage.setUser(newUser);
    await storage.setContacts(mockContacts);
    const initialChats = createMockChats(newUser.id);
    await storage.setChats(initialChats);
    const initialCalls = createMockCalls();
    await storage.setCalls(initialCalls);
    const initialStatuses = createMockStatuses();
    await storage.setStatuses(initialStatuses);

    for (const chat of initialChats) {
      if (chat.type === "individual") {
        const otherParticipant = chat.participants.find(
          (p) => p !== newUser.id
        );
        if (otherParticipant) {
          const messages = createMockMessages(
            chat.id,
            newUser.id,
            otherParticipant
          );
          await storage.setMessages(chat.id, messages);
        }
      }
    }

    setUser(newUser);
    setContacts(mockContacts);
    setChats(initialChats);
    setCalls(initialCalls);
    setStatuses(initialStatuses);
  }

  async function logout() {
    await storage.clearAll();
    setUser(null);
    setContacts([]);
    setChats([]);
    setCalls([]);
    setStatuses([]);
  }

  async function updateProfile(updates: Partial<User>) {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    await storage.setUser(updatedUser);
    setUser(updatedUser);
  }

  async function getMessages(chatId: string): Promise<Message[]> {
    return storage.getMessages(chatId);
  }

  async function sendMessage(chatId: string, text: string) {
    if (!user || !text.trim()) return;

    const newMessage: Message = {
      id: generateId(),
      chatId,
      senderId: user.id,
      text: text.trim(),
      timestamp: new Date(),
      status: "sent",
    };

    const messages = await storage.getMessages(chatId);
    messages.push(newMessage);
    await storage.setMessages(chatId, messages);

    const updatedChats = chats.map((chat) =>
      chat.id === chatId
        ? { ...chat, lastMessage: newMessage, updatedAt: new Date() }
        : chat
    );
    updatedChats.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
    setChats(updatedChats);
    await storage.setChats(updatedChats);

    setTimeout(async () => {
      const msgs = await storage.getMessages(chatId);
      const updatedMessages = msgs.map((m) =>
        m.id === newMessage.id ? { ...m, status: "delivered" as const } : m
      );
      await storage.setMessages(chatId, updatedMessages);

      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId && c.lastMessage?.id === newMessage.id
            ? {
                ...c,
                lastMessage: { ...c.lastMessage, status: "delivered" },
              }
            : c
        )
      );
    }, 1000);
  }

  async function createChat(
    participantIds: string[],
    groupName?: string
  ): Promise<Chat> {
    if (!user) throw new Error("User not logged in");

    const allParticipants = [user.id, ...participantIds];
    const isGroup = participantIds.length > 1 || groupName;

    const existingChat = chats.find(
      (chat) =>
        !isGroup &&
        chat.type === "individual" &&
        chat.participants.length === 2 &&
        chat.participants.includes(user.id) &&
        chat.participants.includes(participantIds[0])
    );

    if (existingChat) return existingChat;

    const newChat: Chat = {
      id: generateId(),
      type: isGroup ? "group" : "individual",
      participants: allParticipants,
      name: groupName,
      avatar: isGroup ? Math.floor(Math.random() * 6) : undefined,
      unreadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    await storage.setChats(updatedChats);

    return newChat;
  }

  function markChatAsRead(chatId: string) {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    );
    storage.setChats(
      chats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
    );
  }

  function getContactById(id: string): User | undefined {
    return contacts.find((c) => c.id === id);
  }

  function getChatParticipants(chat: Chat): User[] {
    return chat.participants
      .filter((id) => id !== user?.id)
      .map((id) => getContactById(id))
      .filter((c): c is User => c !== undefined);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        contacts,
        chats,
        calls,
        statuses,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        updateProfile,
        getMessages,
        sendMessage,
        createChat,
        markChatAsRead,
        getContactById,
        getChatParticipants,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
