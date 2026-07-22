"use client";
import { useState } from "react";
import { updateSettingsAction } from "../actions";

export default function SettingsClient({ initialSettings }) {
  // initialSettings is an object, not an array
  const [settings, setSettings] = useState(initialSettings || {});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const updates = {
      store_name: formData.get("store_name"),
      support_email: formData.get("support_email"),
      support_phone: formData.get("support_phone"),
      shipping_charge: Number(formData.get("shipping_charge")),
      free_shipping_threshold: Number(formData.get("free_shipping_threshold")),
      currency: formData.get("currency")
    };

    try {
      await updateSettingsAction(settings.id, updates);
      alert("Settings updated successfully!");
      setSettings({ ...settings, ...updates });
    } catch (err) {
      console.error(err);
      alert("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-2">Settings</h1>
          <p className="text-secondary-text">Configure store preferences.</p>
        </div>
      </div>

      <div className="bg-surface border border-border/20 rounded-2xl p-6 md:p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-heading font-semibold text-primary-text mb-6 pb-4 border-b border-border/20">Store Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Store Name</label>
              <input type="text" name="store_name" defaultValue={settings.store_name} className="bg-black/20 border border-border/30 rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent" required />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Support Email</label>
              <input type="email" name="support_email" defaultValue={settings.support_email} className="bg-black/20 border border-border/30 rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent" required />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Support Phone</label>
              <input type="tel" name="support_phone" defaultValue={settings.support_phone} className="bg-black/20 border border-border/30 rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent" required />
            </div>
          </div>
          
          <h2 className="text-xl font-heading font-semibold text-primary-text mb-6 pt-6 pb-4 border-b border-border/20">Shipping & Currency</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Currency</label>
              <select name="currency" defaultValue={settings.currency || 'INR'} className="bg-black/20 border border-border/30 rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent">
                <option value="INR" className="bg-surface text-primary-text">INR (₹)</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Default Shipping Charge (₹)</label>
              <input type="number" step="0.01" name="shipping_charge" defaultValue={settings.shipping_charge} className="bg-black/20 border border-border/30 rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent" required />
            </div>
            
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-secondary-text font-bold">Free Shipping Threshold (₹)</label>
              <input type="number" step="0.01" name="free_shipping_threshold" defaultValue={settings.free_shipping_threshold} className="bg-black/20 border border-border/30 rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent" required />
            </div>
          </div>

          <div className="pt-6 border-t border-border/20 flex justify-end">
            <button type="submit" disabled={loading} className="px-8 py-4 bg-accent text-background font-bold tracking-widest uppercase rounded-xl hover:bg-accent-hover transition-colors shadow-lg disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
