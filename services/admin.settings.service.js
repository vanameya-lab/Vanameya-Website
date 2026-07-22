import { createAdminClient } from "@/lib/supabase/admin";

export const adminSettingsService = {
  /**
   * Get store settings
   */
  async getSettings() {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore "no rows" error in case it's not seeded yet
      console.error("Error fetching settings:", error);
      throw error;
    }

    return data || {};
  },

  /**
   * Update store settings
   */
  async updateSettings(id, updates) {
    const supabase = createAdminClient();
    
    let result;
    if (id) {
      result = await supabase
        .from('store_settings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('store_settings')
        .insert([updates])
        .select()
        .single();
    }

    const { data, error } = result;

    if (error) {
      console.error("Error updating settings:", error);
      throw error;
    }

    return data;
  }
};
