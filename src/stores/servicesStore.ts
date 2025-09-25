import { makeAutoObservable, runInAction } from 'mobx';
import { fetchServices } from '../api/services';
import type { Service } from '../types/services';
import type { AxiosError } from 'axios';
class ServicesStore {
    services: Service[] = [];
    loading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async loadServices() {
        this.loading = true;
        this.error = null;
        try {
            const data = await fetchServices();
            runInAction(() => {
                this.services = data;
            });
        } catch (err: unknown) {
            runInAction(() => {
                const error = err as AxiosError;
                this.error = error.message ?? 'Error services';
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}

export const servicesStore = new ServicesStore();
