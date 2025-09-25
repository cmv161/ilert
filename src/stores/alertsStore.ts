import { makeAutoObservable, runInAction } from 'mobx';
import { fetchAlerts, fetchRecentAlertActivity } from '../api/services';
import type { Alert } from '../types/alerts';
import type { LogEntry } from '../types/alerts';

class AlertsStore {
    alerts: Alert[] = [];
    recentActivity: LogEntry[] = [];

    loading = false;
    activityLoading = false;

    error: string | null = null;
    activityError: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async loadAlerts(params?: Parameters<typeof fetchAlerts>[0]) {
        this.loading = true;
        this.error = null;
        try {
            const data = await fetchAlerts(params);
            runInAction(() => {
                this.alerts = data;
            });
        } catch (err: unknown) {
            runInAction(() => {
                if (err instanceof Error) {
                    this.error = err.message;
                } else {
                    this.error = 'Error alerts';
                }
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async loadRecentActivity(limit = 5) {
        this.activityLoading = true;
        this.activityError = null;
        try {
            const data = await fetchRecentAlertActivity(limit);
            runInAction(() => {
                this.recentActivity = data.slice(0, 6);
            });
        } catch (err: unknown) {
            runInAction(() => {
                if (err instanceof Error) {
                    this.activityError = err.message;
                } else {
                    this.activityError = 'Error recent alert activity';
                }
            });
        } finally {
            runInAction(() => {
                this.activityLoading = false;
            });
        }
    }

    get openAlertsCount() {
        return this.alerts.filter(a => a.status === 'OPEN').length;
    }

    get pendingAlertsCount() {
        return this.alerts.filter(a => a.status === 'PENDING').length;
    }

    get acceptedAlertsCount() {
        return this.alerts.filter(a => a.status === 'ACCEPTED').length;
    }
}

export const alertsStore = new AlertsStore();
