import type { Widget } from "../stores/widgetsStore";
import {ilertClient} from "./services";

type DashboardPreferences = Record<string, Widget[]>;

const VIEW_ID = "DASHBOARD";

export async function loadPreferences() {
  const { data } = await ilertClient.get(`/v1/user-view-preferences/${VIEW_ID}`);
  return data;
}

export async function savePreferences(payload: DashboardPreferences) {
  const { data } = await ilertClient.put(`/v1/user-view-preferences/${VIEW_ID}`, payload);
  return data;
}
