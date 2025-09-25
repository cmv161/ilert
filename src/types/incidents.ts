export type ServiceStatus = "OPERATIONAL" | "DEGRADED" | "MAJOR_OUTAGE";

export type Incident = {
  id: number;
  summary: string;
  status: string; 
  message: string;
  createdAt: string;
  affectedServices: {
    service: {
      id: number;
      name: string;
      status: ServiceStatus;
    };
    impact: ServiceStatus;
  }[];
};