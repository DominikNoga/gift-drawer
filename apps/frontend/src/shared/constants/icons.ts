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
  Heart,
  // User & People
  User,
  Users,
  UserX,
  
  // Communication
  Mail,
  
  // Christmas & Gifts
  Gift,
  Star,
  
  // Interface Elements
  Calendar,
  DollarSign,
  Link as LinkIcon,
  QrCode,
  MapPin,
  
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
  CircleCheckBig,
  Linkedin,
  Github,
  Eye,
  MessageSquare,
  MailIcon,
  UserPlus,
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
  AddUser: UserPlus,
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
  Shuffle: Shuffle,
  Heart: Heart,
  Star: Star,
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
  Cancel: X,
  Location: MapPin,
  Success: CircleCheckBig,
  Message: MessageSquare,
  Send: MailIcon,
} as const;

// =============================================================================
// STATUS & FEEDBACK
// =============================================================================

export const StatusIcons = {
  Complete: CheckCircle,
  Warning: AlertCircle,
  Error: AlertTriangle,
} as const;

export const SocialIcons = {
  Linkedin: Linkedin,
  Github: Github,
} as const;
