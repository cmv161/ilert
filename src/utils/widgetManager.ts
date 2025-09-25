import { alertsStore } from "../stores/alertsStore";
import { incidentsStore } from "../stores/incidentsStore";
import { servicesStore } from "../stores/servicesStore";
import { widgetsStore, type WidgetType } from "../stores/widgetsStore";

const addWidgetWithData= (type: WidgetType, id?: string)=> {
    
  switch (type) {
    case 'alerts':
      alertsStore.loadAlerts({ states: ['OPEN'] });
      break;
    case 'activity':
      alertsStore.loadRecentActivity();
      break;
    case 'services':
      servicesStore.loadServices();
      break;
    case 'incidents':
      incidentsStore.loadIncidents();
      break;
  }

  if (id) {
    widgetsStore.replacePlaceholder(id, type);
  } else {
    widgetsStore.addWidget(type);
  }
}
export{ addWidgetWithData };