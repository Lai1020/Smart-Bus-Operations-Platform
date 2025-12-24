
export enum Priority {
  URGENT = 'urgent',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export interface WorkOrder {
  id: string;
  title: string;
  priority: Priority;
  status: string;
  assignee: string | null;
  progress: number;
  timeline: string;
  created: string;
}

export interface Asset {
  id: string;
  name: string;
  vendor: string;
  date: string;
  status: string;
  life: string;
  value: string;
  model?: string;
  price?: number;
  warranty?: string;
  depreciation?: number;
  qty?: number;
}

export interface AIRecommendation {
  title: string;
  frequency: string;
  items: string[];
  reason: string;
}
