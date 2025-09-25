import { makeAutoObservable, runInAction } from 'mobx';
import { loadPreferences, savePreferences } from '../api/preferences';

export type WidgetType = 'alerts' | 'services' | 'activity' | 'incidents' | 'placeholder';

export type Widget = {
    id: string;
    type: WidgetType;
};

class WidgetsStore {
    widgets: Widget[] = [];
    team = 'SRE Team';
    allPreferences: Record<string, Widget[]> = {};
    loading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    addWidget(type: WidgetType) {
        const exists = this.widgets.find(w => w.type === type);
        if (exists) {
            return false;
        }

        this.widgets.push({
            id: `${type}-${Date.now()}`,
            type,
        });
        return true;
    }

    moveWidget(dragIndex: number, dropIndex: number) {
        if (dragIndex === dropIndex) return;

        const updated = [...this.widgets];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(dropIndex, 0, moved);

        this.widgets = updated;
    }

    removeWidget(id: string) {
        const idx = this.widgets.findIndex(w => w.id === id);
        if (idx !== -1) {
            this.widgets[idx] = { id: `placeholder-${Date.now()}`, type: 'placeholder' };
        }
    }

    replacePlaceholder(id: string, type: WidgetType) {
        const idx = this.widgets.findIndex(w => w.id === id);
        if (idx !== -1) {
            this.widgets[idx] = { id: `${type}-${Date.now()}`, type };
        }
    }

    async fetchPreferences() {
        this.loading = true;
        this.error = null;
        try {
            const data = await loadPreferences();
            runInAction(() => {
                this.allPreferences = data || {};
                this.widgets = this.allPreferences[this.team] || [];
            });
        } catch (err) {
            runInAction(() => {
                this.error = err instanceof Error ? err.message : 'Error preferences';
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async persistPreferences() {
        try {
            const updated = {
                ...this.allPreferences,
                [this.team]: this.widgets,
            };

            await savePreferences(updated);

            runInAction(() => {
                this.allPreferences = updated;
            });
        } catch (err) {
            runInAction(() => {
                this.error = err instanceof Error ? err.message : 'Error save preferences';
            });
        }
    }

    setTeam(newTeam: string) {
        this.team = newTeam;
        this.widgets = this.allPreferences[newTeam] || [];
    }

    setWidgets(widgets: Widget[]) {
        this.widgets = widgets;
    }

    deleteWidget(id: string) {
        this.widgets = this.widgets.filter(w => w.id !== id);
    }
}

export const widgetsStore = new WidgetsStore();
