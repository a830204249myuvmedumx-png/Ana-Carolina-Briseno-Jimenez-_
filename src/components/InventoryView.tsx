import React, { useState } from 'react';
import { InventoryItem, Warehouse } from '../types';
import { 
  Search, 
  Warehouse as WarehouseIcon, 
  AlertTriangle, 
  RefreshCw, 
  Plus, 
  SlidersHorizontal,
  FolderDot,
  X,
  PlusCircle,
  TrendingDown,
  Box,
  CornerDownRight
} from 'lucide-react';

interface InventoryViewProps {
  inventory: InventoryItem[];
  warehouses: Warehouse[];
  onAddProduct: (item: InventoryItem) => void;
  onRestockItem: (sku: string, amount: number) => void;
  lang: 'es' | 'en';
}

export default function InventoryView({ 
  inventory, 
  warehouses, 
  onAddProduct, 
  onRestockItem, 
  lang 
}: InventoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Stock' | 'Low Stock' | 'Out of Stock'>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form states
  const [newSku, setNewSku] = useState('CHIP-991-SG');
  const [newName, setNewName] = useState('Helium Neon Laser Core');
  const [newWarehouse, setNewWarehouse] = useState('Singapore Central');
  const [newStock, setNewStock] = useState(250);
  const [newCat, setNewCat] = useState('Optical');

  // Filter inventory
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'All' ? true : item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate critical ones (Low Stock or Out of Stock)
  const criticalItems = inventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newSku.trim()) return;

    const sampleImages = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKuMXPhw_DWahqmJmvfPf3KsSMMGd3QpIGNmdDXUiHTjh3rtY5dMlunjGODVZi9QzL9TiJ4-gEOb2XCQI5OeHMiYkgitGl6YxtS6ixAPIWGz9iWrBpiD3oduUTLRtXZ5ahfwRiHF65LO2dANNEOs584huyKw0iJpYJ9VeGpM1HWxa69U15PcwAOo05ZPb5jmZXWrVmRW1DCv5deZhoueWeOTN3CuCqmwUAgNKzzXd-yOdRlKrDhpaoesdIjQIIxIltAPtjZlNmubI',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBz9SZ-POTceKiQywr7rxm0aBClqgjuC0bglYUCabDnnqr9BFgQeLE8-RrM0Kwd94dvBbPjJ_bAPGMpL3HLfV381CxG4Nf4SEyJ4WogSrg8C7tbyKGDKpX2ylNWj0IsxaRe4K5O-xolTkzZtBwpybeh5YPnRIDt5JSqwoYqf8XTwexxrr5_P9Ib--sZgAhgJzP7Qi2R7aB6UXgRpEbB1-M14vy6msIKuGZi6rXupkvFQzLzG_7WORkNEKZfKjL3OULlpJvrvTkOv7g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCwUtGc1jboPAACdYryRgrdWlqmQ80_C3eHwARW9_GYriCKsPhaTyp5fyy01AJRQkQJe9cC9YxnoRyaYtwBzGZ6sdhG40BT8lE1J3TzyUfzjZbNdAUmSyhAvLrSXK3HxQ_RmLh9ovza6tGvzpGjBI3xIrgjUu9U9mmaiYg-RCS3AG1UV0FqS9rlCxhuD1h--ac3KI6MGYnXT7AEgqWBV1VnMkEKaRgDTJYCJEu1InLjBgXMqFQA54VPrt0jyvQ5OxZkWPMhOgRiGtw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9_ZqhcpZHbCGwXLPTDYgxjq5eX6U5jmyqYH3gbrL5kAokPTzWicJSWt2TLcKzQiq0sc_a_oHbzNnTgjKveaMIfcC57sGgmWzGtGIr5l53aE-Zk9K-6h8spqaw5mv98TX_VP4cwsJt6KMA9WYxyN0n9d0oNpPPKL0QzkkcZsgNlH97B0_wfO1m7K3iSycFfMiEW3lAIZawKiv9IdwuEKspwXjDJuF6Ol2s3O12wCvVlqNAIR5zLWjy9Y5D-QLr1ZgsrsOABGscSMg'
    ];
    // Random image picker for mock
    const randomImg = sampleImages[Math.floor(Math.random() * sampleImages.length)];

    const newItem: InventoryItem = {
      sku: newSku.toUpperCase(),
      name: newName,
      warehouse: newWarehouse,
      stockLevel: newStock,
      status: newStock === 0 ? 'Out of Stock' : newStock < 50 ? 'Low Stock' : 'In Stock',
      imageUrl: randomImg,
      category: newCat
    };

    onAddProduct(newItem);
    setShowAddModal(false);

    // Reset fields
    setNewSku(`SKU-${Math.floor(100 + Math.random() * 899)}-CORP`);
    setNewName('');
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Top Header Row with quick FAB trigger */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-headline uppercase">
            {lang === 'es' ? 'Gestión de Inventario' : 'Inventory Management'}
          </h2>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest block">
            {lang === 'es' ? 'ALMACENAMIENTO GLOBAL CON COMPENSACIÓN DE STOCK' : 'GLOBAL MULTI-WAREHOUSE INVENTORY LEDGER'}
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-xl flex items-center gap-2 shadow-xs transition-all active:scale-95 duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>{lang === 'es' ? 'Agregar Producto' : 'New Product'}</span>
        </button>
      </header>

      {/* Warehouse network limits (Top KPI Row) */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold font-headline text-slate-400 uppercase tracking-widest">
          {lang === 'es' ? 'Capacidad de Red de Bodegas' : 'Warehouse Network Capacity'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {warehouses.map((wh) => {
            const isCritical = wh.used >= 90;
            return (
              <div key={wh.name} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-blue-50/70 text-blue-600">
                      <WarehouseIcon className="w-4 h-4 text-blue-600" />
                    </span>
                    <h4 className="font-bold text-slate-950 text-xs leading-none">{wh.name}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase font-headline border ${
                    isCritical 
                      ? 'bg-rose-50 text-rose-700 border-rose-100' 
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {wh.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-slate-500 font-medium">Capacity Used</span>
                    <span className="font-extrabold text-slate-900">{wh.used}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isCritical ? 'bg-rose-600' : 'bg-blue-600'}`}
                      style={{ width: `${wh.used}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Main Content Block: Side critical alert, and ledger table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Critical Stock Warnings (Always clickable to restock!) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <h3 className="font-headline font-extrabold text-sm uppercase tracking-wider">
                {lang === 'es' ? 'Advertencias Críticas' : 'Stock Restoration Needed'}
              </h3>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === 'es' 
                ? 'Los productos listados están bajo el umbral mínimo. Haz clic en Restaurar para surtir 500 unidades inmediatamente.' 
                : 'The following critical assets are low or out-of-stock. Triggering restock instantly imports 500 items.'}
            </p>

            <div className="space-y-3 pt-2">
              {criticalItems.length === 0 ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg text-center uppercase">
                  {lang === 'es' ? '✓ Red en Nivel Óptimo' : '✓ All Stocks Optimal'}
                </div>
              ) : (
                criticalItems.map((item) => {
                  return (
                    <div 
                      key={item.sku} 
                      className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.sku} • {item.warehouse.split(' ')[0]}</p>
                        <p className="text-[11px] font-bold text-rose-600 mt-1 uppercase">
                          {item.stockLevel} {lang === 'es' ? 'Unidades' : 'Units Left'}
                        </p>
                      </div>
                      <button 
                        onClick={() => onRestockItem(item.sku, 500)}
                        className="p-2 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 text-slate-700 hover:text-blue-600 transition-all shrink-0 cursor-pointer flex items-center gap-1.5 font-bold text-[10px]"
                        title={lang === 'es' ? 'Restaurar Stock' : 'Restock 500 items'}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'Restablecer' : 'Restock'}</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>

        {/* Right column: Searchable stock ledger */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Filtering row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'es' ? 'Buscar por SKU o Nombre...' : 'Search SKU or name...'}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {(['All', 'In Stock', 'Low Stock', 'Out of Stock'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    statusFilter === filter 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Ledger Table Grid */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/60 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="py-4 px-5">{lang === 'es' ? 'Descripción del Item' : 'Product / SKU'}</th>
                    <th className="py-4 px-5">{lang === 'es' ? 'Ubicación' : 'Warehouse'}</th>
                    <th className="py-4 px-5">{lang === 'es' ? 'Unidades' : 'Stock Level'}</th>
                    <th className="py-4 px-5">{lang === 'es' ? 'Estado' : 'Status'}</th>
                    <th className="py-4 px-5 text-right">{lang === 'es' ? 'Acciones' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredInventory.map((item) => {
                    const statusColors = {
                      'In Stock': 'bg-emerald-50 text-emerald-800 border-emerald-100',
                      'Low Stock': 'bg-amber-50 text-amber-850 border-amber-100',
                      'Out of Stock': 'bg-rose-50 text-rose-800 border-rose-105 border-rose-100'
                    };

                    return (
                      <tr key={item.sku} className="hover:bg-slate-50/50 transition-colors">
                        
                        {/* Image & details */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 shrink-0 bg-slate-100">
                              <img 
                                alt={item.name} 
                                className="w-full h-full object-cover" 
                                src={item.imageUrl}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate max-w-[180px]">{item.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.sku} • {item.category}</p>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-4 px-5 text-xs text-slate-600">
                          {item.warehouse}
                        </td>

                        {/* Units count */}
                        <td className="py-4 px-5 text-xs font-bold text-slate-900">
                          {item.stockLevel.toLocaleString()}
                        </td>

                        {/* Status chip */}
                        <td className="py-4 px-5">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusColors[item.status]}`}>
                            {item.status}
                          </span>
                        </td>

                        {/* Fast stock restock button inside ledger too! */}
                        <td className="py-4 px-5 text-right">
                          <button 
                            onClick={() => onRestockItem(item.sku, 100)}
                            className="bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                            title="Quickly restock 100 items"
                          >
                            +100
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredInventory.length === 0 && (
                <div className="p-12 text-center text-slate-400 text-xs">
                  {lang === 'es' ? 'Ningún item coincide con el criterio' : 'No items match your query.'}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* MODAL: Add New Product */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-headline text-slate-900 flex items-center gap-2">
                <Box className="w-5 h-5 text-blue-600" />
                <span>{lang === 'es' ? 'Alta de Nuevo Elemento' : 'New Inventory Item Registration'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'es' ? 'Registra un SKU para su distribución logística.' : 'Declare custom items for warehouse dispatching.'}
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    SKU Code
                  </label>
                  <input 
                    type="text" 
                    value={newSku} 
                    onChange={(e) => setNewSku(e.target.value)}
                    className="w-full bg-slate-100 border border-transparent rounded-lg text-xs px-3 py-2.5 font-mono uppercase focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    {lang === 'es' ? 'Categoría' : 'Category'}
                  </label>
                  <select 
                    value={newCat} 
                    onChange={(e) => setNewCat(e.target.value)}
                    className="w-full bg-slate-100 border border-transparent rounded-lg text-xs px-3 py-2.5 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outlook-none"
                  >
                    <option>Optical</option>
                    <option>Semiconductor</option>
                    <option>Mechanical</option>
                    <option>Medical</option>
                    <option>General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  {lang === 'es' ? 'Nombre Comercial' : 'Product Name'}
                </label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="E.g. Sapphire Lens System v4"
                  className="w-full bg-slate-100 border border-transparent rounded-lg text-xs px-3 py-2.5 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    {lang === 'es' ? 'Bodega' : 'Warehouse Location'}
                  </label>
                  <select
                    value={newWarehouse}
                    onChange={(e) => setNewWarehouse(e.target.value)}
                    className="w-full bg-slate-100 border border-transparent rounded-lg text-xs px-3 py-2.5 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                  >
                    {warehouses.map(wh => (
                      <option key={wh.name}>{wh.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    {lang === 'es' ? 'Stock Inicial' : 'Initial Stock units'}
                  </label>
                  <input 
                    type="number" 
                    value={newStock} 
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-slate-100 border border-transparent rounded-lg text-xs px-3 py-2.5 font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                    min={0}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-xs"
              >
                {lang === 'es' ? 'Dar de Alta' : 'Register SKU Asset'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
