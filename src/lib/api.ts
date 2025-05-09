
import { supabase } from '@/integrations/supabase/client';
import { Business, UserProfile, VoiceSettings, CallLog, Appointment, RestaurantOrder } from '@/types/schema';

// Businesses API
export const fetchBusinesses = async () => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*');
  
  if (error) throw error;
  return data as Business[];
};

export const fetchBusinessById = async (id: string) => {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Business;
};

export const createBusiness = async (business: Omit<Business, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('businesses')
    .insert(business)
    .select()
    .single();
  
  if (error) throw error;
  return data as Business;
};

export const updateBusiness = async (id: string, business: Partial<Business>) => {
  const { data, error } = await supabase
    .from('businesses')
    .update(business)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Business;
};

export const deleteBusiness = async (id: string) => {
  const { error } = await supabase
    .from('businesses')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// User Profiles API
export const fetchUserProfiles = async () => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*');
  
  if (error) throw error;
  return data as UserProfile[];
};

export const fetchUserProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as UserProfile;
};

export const updateUserProfile = async (id: string, profile: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(profile)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as UserProfile;
};

// Voice Settings API
export const fetchVoiceSettingsByBusinessId = async (businessId: string) => {
  const { data, error } = await supabase
    .from('voice_settings')
    .select('*')
    .eq('business_id', businessId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned" which is fine
  return data as VoiceSettings | null;
};

export const createVoiceSettings = async (settings: Omit<VoiceSettings, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('voice_settings')
    .insert(settings)
    .select()
    .single();
  
  if (error) throw error;
  return data as VoiceSettings;
};

export const updateVoiceSettings = async (id: string, settings: Partial<VoiceSettings>) => {
  const { data, error } = await supabase
    .from('voice_settings')
    .update(settings)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as VoiceSettings;
};

// Call Logs API
export const fetchCallLogsByBusinessId = async (businessId: string) => {
  const { data, error } = await supabase
    .from('call_logs')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as CallLog[];
};

// Appointments API
export const fetchAppointmentsByBusinessId = async (businessId: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('business_id', businessId)
    .order('start_time', { ascending: true });
  
  if (error) throw error;
  return data as Appointment[];
};

export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single();
  
  if (error) throw error;
  return data as Appointment;
};

export const updateAppointment = async (id: string, appointment: Partial<Appointment>) => {
  const { data, error } = await supabase
    .from('appointments')
    .update(appointment)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Appointment;
};

// Restaurant Orders API
export const fetchRestaurantOrdersByBusinessId = async (businessId: string) => {
  const { data, error } = await supabase
    .from('restaurant_orders')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as RestaurantOrder[];
};

export const createRestaurantOrder = async (order: Omit<RestaurantOrder, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('restaurant_orders')
    .insert(order)
    .select()
    .single();
  
  if (error) throw error;
  return data as RestaurantOrder;
};

export const updateRestaurantOrder = async (id: string, order: Partial<RestaurantOrder>) => {
  const { data, error } = await supabase
    .from('restaurant_orders')
    .update(order)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as RestaurantOrder;
};

// Audit logs
export const logAuditEvent = async (action: string, entityType: string, entityId: string | null, details: any = {}) => {
  // Get the user's IP address (in a real app, you'd use a third-party service for this)
  const ipAddress = "client-ip"; // Placeholder
  
  const { error } = await supabase
    .from('audit_logs')
    .insert({
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      ip_address: ipAddress
    });
  
  if (error) {
    console.error('Failed to log audit event:', error);
  }
};
