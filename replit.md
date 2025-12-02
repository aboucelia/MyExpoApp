# ChatApp - WhatsApp-Like Messaging Application

## Overview
ChatApp is a React Native mobile messaging application built with Expo that provides a WhatsApp-like experience. The app features real-time messaging, group chats, call history, status updates, and a beautiful iOS-style liquid glass interface with WhatsApp's signature green theme.

## Current State
- **Version**: 1.0.0
- **Status**: MVP Complete - Ready for testing
- **Platform**: iOS, Android, and Web (via Expo)

## Features Implemented
1. **User Authentication**: Simple login with name and avatar selection
2. **Chats Screen**: List of all conversations with last message preview and timestamps
3. **Chat Conversation**: Real-time messaging with message bubbles and status indicators
4. **New Chat/Group**: Create individual or group conversations
5. **Status Screen**: View status updates from contacts
6. **Calls Screen**: Call history with voice/video call indicators
7. **Settings Screen**: User profile and app preferences with logout

## Project Architecture

### Directory Structure
```
├── App.tsx                 # Main app entry with AuthProvider
├── contexts/
│   └── AuthContext.tsx     # Authentication and data management
├── navigation/
│   ├── MainStackNavigator.tsx
│   ├── MainTabNavigator.tsx
│   ├── ChatsStackNavigator.tsx
│   ├── StatusStackNavigator.tsx
│   ├── CallsStackNavigator.tsx
│   └── SettingsStackNavigator.tsx
├── screens/
│   ├── LoginScreen.tsx
│   ├── ChatsScreen.tsx
│   ├── ChatConversationScreen.tsx
│   ├── NewChatScreen.tsx
│   ├── NewGroupScreen.tsx
│   ├── StatusScreen.tsx
│   ├── CallsScreen.tsx
│   └── SettingsScreen.tsx
├── components/
│   ├── Avatar.tsx
│   ├── MessageBubble.tsx
│   ├── MessageStatus.tsx
│   ├── ChatInput.tsx
│   ├── ChatListItem.tsx
│   ├── CallListItem.tsx
│   ├── ContactListItem.tsx
│   ├── StatusListItem.tsx
│   ├── SettingsItem.tsx
│   ├── FloatingActionButton.tsx
│   ├── EmptyState.tsx
│   └── ... (shared components)
├── types/
│   └── chat.ts             # TypeScript interfaces
├── utils/
│   ├── storage.ts          # AsyncStorage utilities
│   ├── mockData.ts         # Sample data for MVP
│   └── dateUtils.ts        # Date formatting
└── constants/
    └── theme.ts            # WhatsApp color palette and design tokens
```

### Design System
- **Primary Color**: WhatsApp Green (#25D366)
- **Dark Theme Primary**: #075E54
- **Light Green (sent messages)**: #DCF8C6
- **Checkmark Blue (read)**: #53BDEB
- **Checkmark Gray (delivered)**: #92969B

### Data Persistence
- Uses `@react-native-async-storage/async-storage`
- User profile, chats, messages, contacts, calls, and statuses are stored locally
- Data clears on logout

## User Preferences
- Arabic language support (RTL)
- Modern iOS-style interface
- WhatsApp-inspired design

## Recent Changes
- December 2, 2025: Initial MVP release with core messaging features

## Running the App
```bash
npm run dev
```
- Scan QR code with Expo Go app on mobile device
- Open web version at provided URL

## Future Enhancements
- Backend integration for real-time sync between devices
- Image/video/file sharing
- Voice messages and calls
- End-to-end encryption
- Stories/status with media
- Cloud backup and restore
