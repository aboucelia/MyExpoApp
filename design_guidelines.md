# Design Guidelines: WhatsApp-Like Messaging App

## Architecture Decisions

### Authentication
**Auth Required** - The app includes user accounts and real-time messaging between users.

**Implementation:**
- SSO preferred: Apple Sign-In (iOS) and Google Sign-In (Android)
- Profile setup after first login:
  - Display name (required)
  - Profile photo (camera/gallery or select from 6 preset avatars)
  - Phone number (optional, for discoverability)
  - Status message (e.g., "Hey there! I am using WhatsApp")
- Privacy & Terms of Service links on login screen

**Profile/Account Screen:**
- Avatar with edit button
- Display name, phone number, status message (all editable)
- Settings submenu with:
  - Notifications preferences
  - Chat backup settings
  - Privacy settings (last seen, read receipts, profile photo visibility)
  - Account > Delete account (double confirmation required)
- Log out button (with confirmation alert)

### Navigation
**Tab Navigation** (4 tabs + Floating Action Button):

1. **Chats** (Home) - List of all conversations
2. **Status** - Stories/updates from contacts
3. **Calls** - Call history
4. **Settings** - User profile and app settings

**Core Action:** Floating Action Button (FAB) for "New Chat" - positioned bottom-right, above tab bar

**Modal Screens:**
- Individual chat conversation
- Group chat conversation
- New chat (contact selection)
- New group (multi-select contacts + group info)
- Contact profile view
- Image/media viewer

### Screen Specifications

#### 1. Chats Screen (Tab 1)
**Purpose:** Display all active conversations

**Layout:**
- **Header:** Custom transparent header
  - Title: "Chats"
  - Right button: Search icon
  - No left button
- **Main Content:** FlatList (scrollable)
  - Safe area insets: top: headerHeight + 16, bottom: tabBarHeight + 80 (for FAB clearance)
  - Each chat item shows:
    - Contact/group avatar (48x48 circle)
    - Name (primary text, weight: 600)
    - Last message preview (secondary text, 1 line, ellipsis)
    - Timestamp (top-right, small text)
    - Unread count badge (green circle, white text)
    - Message status indicator (checkmarks)
- **Floating Elements:**
  - FAB (New Chat) - bottom-right
  - Safe area insets: right: 16, bottom: tabBarHeight + 16

#### 2. Chat Conversation Screen (Modal Stack)
**Purpose:** Send and receive messages in real-time

**Layout:**
- **Header:** Custom non-transparent header with subtle border
  - Left button: Back arrow
  - Center: Contact avatar (32x32) + name
  - Right buttons: Video call, Voice call, More (3-dot menu)
- **Main Content:** Inverted FlatList (messages scroll from bottom)
  - Safe area insets: top: 16, bottom: 60 (for input bar)
  - Message bubbles:
    - Sent: Align right, green background (#25D366)
    - Received: Align left, light gray background (#F0F0F0)
    - Include timestamp and status indicators
    - Max width: 75% of screen
    - Border radius: 12
    - Padding: 12 vertical, 16 horizontal
- **Fixed Bottom Input Bar:**
  - Height: 56
  - Background: White
  - Safe area insets: bottom: insets.bottom + 8
  - Components (left to right):
    - Emoji button (icon)
    - Text input (flex: 1, multiline, placeholder: "Message")
    - Attachment button (icon)
    - Send button (green circle with send icon OR microphone for voice)

#### 3. New Chat Screen (Modal)
**Purpose:** Select contact to start conversation

**Layout:**
- **Header:** Default navigation header
  - Title: "New Chat"
  - Left button: Cancel
  - Right button: Search icon (optional)
- **Main Content:** ScrollView with search bar + contact list
  - Safe area insets: top: 16, bottom: insets.bottom + 16
  - Search bar at top (sticky)
  - Contact list (alphabetically grouped)
  - "New Group" option at top
  - Each contact: Avatar, Name, Status message

#### 4. Status Screen (Tab 2)
**Purpose:** View stories/updates from contacts

**Layout:**
- **Header:** Transparent
  - Title: "Status"
  - Right button: More options
- **Main Content:** ScrollView
  - Safe area insets: top: headerHeight + 16, bottom: tabBarHeight + 16
  - "My Status" section (can add new)
  - Recent updates (list of circular avatars with green ring)
  - Viewed updates (grayed out)

#### 5. Calls Screen (Tab 3)
**Purpose:** View call history

**Layout:**
- **Header:** Transparent
  - Title: "Calls"
- **Main Content:** FlatList
  - Safe area insets: top: headerHeight + 16, bottom: tabBarHeight + 16
  - Each call entry: Avatar, name, call type (video/voice), timestamp, call status icon

#### 6. Settings Screen (Tab 4)
**Purpose:** User profile and app preferences

**Layout:**
- **Header:** Transparent
  - Title: "Settings"
- **Main Content:** ScrollView with grouped sections
  - Safe area insets: top: headerHeight + 16, bottom: tabBarHeight + 16
  - Profile section (avatar, name, status - tappable)
  - Account settings
  - Chats settings
  - Notifications
  - Storage and data
  - Help & About

## Design System

### Color Palette
**Primary Colors:**
- WhatsApp Green: #25D366 (sent messages, FAB, active states)
- Teal Dark: #075E54 (headers, accents)
- Light Green: #DCF8C6 (alternative for sent messages)

**Neutral Colors:**
- Text Primary: #000000
- Text Secondary: #667781
- Background: #FFFFFF
- Surface: #F7F8FA
- Border: #E9EDEF
- Received Message: #FFFFFF with border

**Status Colors:**
- Unread Badge: #25D366
- Checkmark Blue: #53BDEB (read receipts)
- Checkmark Gray: #92969B (delivered)

### Typography
**Font Family:** System default (SF Pro for iOS, Roboto for Android)

**Text Styles:**
- Header Title: 20px, weight 700
- Chat Name: 16px, weight 600
- Message Text: 15px, weight 400
- Timestamp: 12px, weight 400
- Secondary Text: 14px, weight 400, color: Text Secondary

### Component Specifications

**Message Bubble:**
- Border radius: 8px
- Padding: 8px 12px
- Shadow: NONE
- Sent: background #DCF8C6, align right
- Received: background #FFFFFF, align left, border 1px #E9EDEF

**FAB (New Chat):**
- Size: 56x56 circle
- Background: #25D366
- Icon: Message/Plus (white)
- Shadow: 
  - shadowOffset: {width: 0, height: 2}
  - shadowOpacity: 0.10
  - shadowRadius: 2
  - elevation: 4 (Android)

**Chat List Item:**
- Height: 72px
- Padding: 12px 16px
- Active state: background #F5F6F6
- Press feedback: opacity 0.7

**Tab Bar:**
- Height: 50 + safe area bottom
- Background: #FFFFFF
- Active tab: #25D366
- Inactive tab: #92969B
- Icons: Use Feather or Ionicons from @expo/vector-icons

### Visual Assets Required

**Preset Avatars (6 total):**
- Simple geometric designs with messaging theme
- Colors: Gradients of green, blue, teal
- Style: Minimalist, modern
- Purpose: User profile personalization

**Icons:**
- Use Ionicons for most UI elements
- Custom checkmark states for message status:
  - Single gray check (sent)
  - Double gray checks (delivered)
  - Double blue checks (read)

**No Emojis in UI** - Use standard icons only. Users can send emojis in messages.

### Interaction Design

**Touchable Feedback:**
- Lists/buttons: Opacity 0.7 or background color change
- Message bubbles: Long press for context menu (copy, delete, forward)
- Profile avatars: Tap to view full profile
- FAB: Scale animation on press (0.95)

**Real-time Indicators:**
- Typing indicator: "..." animation in chat footer
- Online status: Small green dot on avatar
- Message status: Checkmarks update in real-time

**Gestures:**
- Swipe right on chat: Archive
- Swipe left on message: Reply
- Pull to refresh: Update chat list

### Accessibility

- All interactive elements minimum 44x44 touch target
- Support for RTL languages (Arabic)
- High contrast mode support
- VoiceOver/TalkBack labels for all icons
- Adjustable text size (respect system preferences)
- Color should not be sole indicator (use icons + text)