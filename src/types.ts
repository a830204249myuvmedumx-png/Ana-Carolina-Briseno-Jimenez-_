export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
}

export interface Shipment {
  id: string;
  carrier: string;
  vesselId: string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'Processing' | 'Delayed' | 'Delivered' | 'Exception';
  eta: string;
  weight: string;
  mode: 'Sea' | 'Air' | 'Road';
  vesselName?: string;
  cruisingSpeed?: string;
  delayDetail?: string;
  temperature?: string;
  waypoints: TimelineItem[];
}

export interface InventoryItem {
  sku: string;
  name: string;
  warehouse: string;
  stockLevel: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  imageUrl: string;
  category: string;
}

export interface Warehouse {
  name: string;
  used: number;
  status: 'Optimal' | 'Near Capacity';
  icon: 'hub' | 'anchor' | 'warehouse' | 'flight_land';
}

export interface ReportItem {
  id: string;
  name: string;
  type: 'PDF' | 'XLSX';
  size: string;
  date: string;
  icon: 'description' | 'table_view' | 'analytics';
}
