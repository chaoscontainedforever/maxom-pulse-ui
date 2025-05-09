
export type UserRole = 'super_admin' | 'business_owner' | 'employee';
export type BusinessType = 'restaurant' | 'fitness' | 'auto_dealership' | 'healthcare' | 'home_services';
export type VoiceType = 'male' | 'female' | 'neutral';
export type CallStatus = 'completed' | 'missed' | 'scheduled' | 'in_progress';

export interface Business {
  id: string;
  name: string;
  business_type: BusinessType;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  business_id?: string;
  created_at: string;
  updated_at: string;
  email?: string; // Added for better access
}

export interface VoiceSettings {
  id: string;
  business_id: string;
  voice_type: VoiceType;
  speech_rate: number;
  greeting_message?: string;
  after_hours_message?: string;
  created_at: string;
  updated_at: string;
}

export interface CallLog {
  id: string;
  business_id: string;
  caller_number?: string;
  caller_name?: string;
  status: CallStatus;
  duration?: number;
  recording_url?: string;
  transcript?: string;
  summary?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface Appointment {
  id: string;
  business_id: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  start_time: string;
  end_time: string;
  service_type?: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface RestaurantOrder {
  id: string;
  business_id: string;
  customer_name?: string;
  customer_phone?: string;
  order_type: string;
  status: string;
  total_amount: number;
  items: any[];
  special_instructions?: string;
  pickup_time?: string;
  created_at: string;
  updated_at: string;
}

export interface AutoServiceRecord {
  id: string;
  business_id: string;
  appointment_id?: string;
  customer_name?: string;
  customer_phone?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: number;
  service_type: string;
  service_notes?: string;
  created_at: string;
  updated_at: string;
}
