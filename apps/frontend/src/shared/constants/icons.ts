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
  EarthIcon,
  TextIcon,
  BanIcon,
  InfoIcon,
  Minus,
  ListChecks,

  Eye,
} from 'lucide-react';

// =============================================================================
// NAVIGATION & ACTIONS
// =============================================================================

export const NavigationIcons = {
  Back: ArrowLeft,
  ExternalLink: ExternalLink,
  Delete: X,
  Confirm: Check,
  Copy: Copy,
  Search: Search,
  Settings: Settings,
} as const;

// =============================================================================
// USER & PEOPLE MANAGEMENT
// =============================================================================

export const UserIcons = {
  User: User,
  Users: Users,
  UserExclude: UserX,
} as const;

// =============================================================================
// COMMUNICATION
// =============================================================================

export const CommunicationIcons = {
  Email: Mail,
} as const;

// =============================================================================
// CHRISTMAS & GIFT THEME
// =============================================================================

export const ChristmasIcons = {
  Gift: Gift,
  Wishlist: ListChecks,
} as const;


export const InterfaceIcons = {
  Calendar: Calendar,
  Money: DollarSign,
  Link: LinkIcon,
  QrCode: QrCode,
  World: EarthIcon,
  Description: TextIcon,
  Exclusion: BanIcon,
  Info: InfoIcon,
  Create: Plus,
  Remove: Minus,
  Preview: Eye,
  Copy: Copy,
} as const;

// =============================================================================
// STATUS & FEEDBACK
// =============================================================================

export const StatusIcons = {
  Complete: CheckCircle,
  Warning: AlertCircle,
  Error: AlertTriangle,
} as const;

// =============================================================================
// ACTIONS & TOOLS
// =============================================================================

export const ActionIcons = {
  Shuffle: Shuffle,
} as const;
