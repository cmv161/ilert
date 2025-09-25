export type AlertStatus = "OPEN" | "PENDING" | "ACCEPTED";

export type Alert = {
  id: string;
  summary: string;
  status: AlertStatus;
  createdAt: string;
};

export type AlertInfo = {
  summary: string;
  alertSource: {
    name: string;
    iconUrl?: string;
  };
};

export type LogEntry = {
  id: number;
  timestamp: string;
  text: string;
  iconClass?: string;
  alert: AlertInfo; 
};