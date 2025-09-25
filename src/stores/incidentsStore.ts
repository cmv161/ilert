import { makeAutoObservable, runInAction } from "mobx";
import { fetchIncidents } from "../api/services";
import type { Incident } from "../types/incidents";

class IncidentsStore {
  incidents: Incident[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadIncidents(params?: Record<string, string | number | boolean>) {
    this.loading = true;
    this.error = null;
    try {
      const data = await fetchIncidents(params);
      runInAction(() => {
        this.incidents = data;
      });
    } catch (err: unknown) {
      runInAction(() => {
        if (err instanceof Error) {
          this.error = err.message;
        } else {
          this.error = "Error incidents";
        }
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }


  get openIncidentsCount() {
    return this.incidents.filter((i) => i.status === "OPEN").length;
  }
}

export const incidentsStore = new IncidentsStore();
