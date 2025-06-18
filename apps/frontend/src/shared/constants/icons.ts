// =============================================================================
// SECRET SANTA APP - ICON SYSTEM
// =============================================================================
// This file provides semantic naming for all icons used in the application
// Import from here instead of directly from lucide-react for consistency

import {
  // Navigation & Actions
  ArrowLeft,
  ExternalLink,
  Plus,
  X,
  Check,
  Copy,
  Search,
  Settings,
  
  // User & People
  User,
  Users,
  UserX,
  
  // Communication
  Mail,
  
  // Christmas & Gifts
  Gift,
  
  // Interface Elements
  Calendar,
  DollarSign,
  Link as LinkIcon,
  QrCode,
  
  // Status & Feedback
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  
  // Actions & Tools
  Shuffle,
} from 'lucide-react';

// =============================================================================
// NAVIGATION & ACTIONS
// =============================================================================

export const NavigationIcons = {
  // Back navigation
  Back: ArrowLeft,
  
  // External links
  ExternalLink: ExternalLink,
  
  // Add/Create actions
  Add: Plus,
  Create: Plus,
  
  // Close/Cancel actions
  Close: X,
  Cancel: X,
  Remove: X,
  Delete: X,
  
  // Confirmation actions
  Confirm: Check,
  Success: Check,
  Done: Check,
  
  // Copy actions
  Copy: Copy,
  Duplicate: Copy,
  
  // Search
  Search: Search,
  Find: Search,
  
  // Settings
  Settings: Settings,
  Configure: Settings,
} as const;

// =============================================================================
// USER & PEOPLE MANAGEMENT
// =============================================================================

export const UserIcons = {
  // Single user
  User: User,
  Person: User,
  Profile: User,
  Account: User,
  
  // Multiple users
  Users: Users,
  People: Users,
  Group: Users,
  Team: Users,
  Participants: Users,
  
  // User exclusions
  UserExclude: UserX,
  UserBlock: UserX,
  Exclude: UserX,
} as const;

// =============================================================================
// COMMUNICATION
// =============================================================================

export const CommunicationIcons = {
  // Email
  Email: Mail,
  Mail: Mail,
  Contact: Mail,
  Message: Mail,
} as const;

// =============================================================================
// CHRISTMAS & GIFT THEME
// =============================================================================

export const ChristmasIcons = {
  // Main gift icon
  Gift: Gift,
  Present: Gift,
  SecretSanta: Gift,
  
  // Christmas theme (using Gift as primary Christmas icon)
  Christmas: Gift,
  Holiday: Gift,
  Celebration: Gift,
} as const;

// =============================================================================
// INTERFACE ELEMENTS
// =============================================================================

export const InterfaceIcons = {
  // Date & Time
  Calendar: Calendar,
  Date: Calendar,
  Schedule: Calendar,
  Event: Calendar,
  
  // Money & Budget
  Money: DollarSign,
  Budget: DollarSign,
  Price: DollarSign,
  Cost: DollarSign,
  Dollar: DollarSign,
  
  // Links & Sharing
  Link: LinkIcon,
  Share: LinkIcon,
  Connect: LinkIcon,
  
  // QR Code & Join
  QrCode: QrCode,
  JoinCode: QrCode,
  Code: QrCode,
} as const;

// =============================================================================
// STATUS & FEEDBACK
// =============================================================================

export const StatusIcons = {
  // Success states
  Success: CheckCircle,
  Complete: CheckCircle,
  Finished: CheckCircle,
  Approved: CheckCircle,
  
  // Warning states
  Warning: AlertCircle,
  Info: AlertCircle,
  Notice: AlertCircle,
  
  // Error states
  Error: AlertTriangle,
  Failed: AlertTriangle,
  Problem: AlertTriangle,
  Issue: AlertTriangle,
} as const;

// =============================================================================
// ACTIONS & TOOLS
// =============================================================================

export const ActionIcons = {
  // Random/Draw actions
  Shuffle: Shuffle,
  Random: Shuffle,
  Draw: Shuffle,
  Mix: Shuffle,
  Generate: Shuffle,
} as const;
