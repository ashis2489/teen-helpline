export interface Counselor {
  id: string;
  name: string;
  specialty: string;
  description: string;
  experience: string;
  languages: string[];
  quote: string;
  avatar: string;
  tags: string[];
}

export interface TimeSlot {
  id: string;
  label: string;
  category: 'morning' | 'afternoon' | 'evening';
  disabled?: boolean;
}

export interface BookingSession {
  counselor: Counselor;
  date: string; // e.g., "November 6, 2024"
  timeSlot: string; // e.g., "10:30 AM"
  notes?: string;
  type: string; // e.g., "Video Call"
}

export interface Message {
  id: string;
  sender: 'counselor' | 'student';
  senderName: string;
  text: string;
  timestamp: string;
  fileAttached?: string;
}

export interface Habit {
  id: string;
  text: string;
  completed: boolean;
}

export type ScreenState = 
  | 'landing' 
  | 'dashboard' 
  | 'book-counselor' 
  | 'date-time' 
  | 'confirm-booking' 
  | 'success' 
  | 'live-session';

export type AudienceMode = 'all' | 'early' | 'mid' | 'late' | 'parent';

