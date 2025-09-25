import axios from 'axios';
import type { Incident } from '../types/incidents';

export const ilertClient = axios.create({
    baseURL: 'https://api.ilert.com/api',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_ILERT_API_KEY}`,
    },
});


type AlertQueryParams = {
    states?: string[];
    sources?: string[];
    responders?: string[];
};

export async function fetchAlerts(params?: AlertQueryParams) {
    const { data } = await ilertClient.get('/alerts', {
        params,
        paramsSerializer: {
            indexes: null,
        },
    });
    return data;
}

export async function fetchRecentAlertActivity(limit = 5) {
    const { data } = await ilertClient.get('/alerts/newest-log-entries', {
        params: {
            include: ['alert', 'vars', 'textPlain'],
            'max-results': limit,
        },
        paramsSerializer: { indexes: null },
    });
    return data;
}

export type Service = {
    id: string;
    name: string;
    status: string;
    description?: string;
};

export async function fetchServices() {
    const { data } = await ilertClient.get<Service[]>('/services');
    return data;
}

export async function fetchIncidents(params?: Record<string, unknown>) {
    const { data } = await ilertClient.get<Incident[]>('/incidents', {
        params,
    });
    return data;
}
