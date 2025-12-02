import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Chat, Message, Call, Status } from "@/types/chat";

const KEYS = {
  USER: "@chatapp_user",
  CHATS: "@chatapp_chats",
  MESSAGES: "@chatapp_messages",
  CONTACTS: "@chatapp_contacts",
  CALLS: "@chatapp_calls",
  STATUSES: "@chatapp_statuses",
};

export const storage = {
  async getUser(): Promise<User | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async setUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user:", error);
    }
  },

  async getChats(): Promise<Chat[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.CHATS);
      if (!data) return [];
      const chats = JSON.parse(data);
      return chats.map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        lastMessage: chat.lastMessage
          ? {
              ...chat.lastMessage,
              timestamp: new Date(chat.lastMessage.timestamp),
            }
          : undefined,
      }));
    } catch {
      return [];
    }
  },

  async setChats(chats: Chat[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.CHATS, JSON.stringify(chats));
    } catch (error) {
      console.error("Error saving chats:", error);
    }
  },

  async getMessages(chatId: string): Promise<Message[]> {
    try {
      const data = await AsyncStorage.getItem(`${KEYS.MESSAGES}_${chatId}`);
      if (!data) return [];
      const messages = JSON.parse(data);
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    } catch {
      return [];
    }
  },

  async setMessages(chatId: string, messages: Message[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        `${KEYS.MESSAGES}_${chatId}`,
        JSON.stringify(messages)
      );
    } catch (error) {
      console.error("Error saving messages:", error);
    }
  },

  async getContacts(): Promise<User[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.CONTACTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async setContacts(contacts: User[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.CONTACTS, JSON.stringify(contacts));
    } catch (error) {
      console.error("Error saving contacts:", error);
    }
  },

  async getCalls(): Promise<Call[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.CALLS);
      if (!data) return [];
      const calls = JSON.parse(data);
      return calls.map((call: any) => ({
        ...call,
        timestamp: new Date(call.timestamp),
      }));
    } catch {
      return [];
    }
  },

  async setCalls(calls: Call[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.CALLS, JSON.stringify(calls));
    } catch (error) {
      console.error("Error saving calls:", error);
    }
  },

  async getStatuses(): Promise<Status[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.STATUSES);
      if (!data) return [];
      const statuses = JSON.parse(data);
      return statuses.map((status: any) => ({
        ...status,
        timestamp: new Date(status.timestamp),
        expiresAt: new Date(status.expiresAt),
      }));
    } catch {
      return [];
    }
  },

  async setStatuses(statuses: Status[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.STATUSES, JSON.stringify(statuses));
    } catch (error) {
      console.error("Error saving statuses:", error);
    }
  },

  async clearAll(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const appKeys = keys.filter((key) => key.startsWith("@chatapp_"));
      await AsyncStorage.multiRemove(appKeys);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
