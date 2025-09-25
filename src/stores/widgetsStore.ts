import { makeAutoObservable } from 'mobx';

export type WidgetType = 'alerts' | 'services' | 'activity' | 'incidents' | 'placeholder';

export type Widget = {
    id: string;
    type: WidgetType;
};

class WidgetsStore {
    widgets: Widget[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addWidget(type: WidgetType) {
        const exists = this.widgets.find(w => w.type === type);
        if (exists) return;

        this.widgets.push({
            id: `${type}-${Date.now()}`,
            type,
        });
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
}

export const widgetsStore = new WidgetsStore();
