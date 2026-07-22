import { getSettingsAction } from "../actions";
import SettingsClient from "./SettingsClient";

export default async function AdminSettingsPage() {
  const initialSettings = await getSettingsAction();

  return <SettingsClient initialSettings={initialSettings || []} />;
}

