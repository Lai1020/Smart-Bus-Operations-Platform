
import React, { useState } from 'react';
import { ChevronRight, BarChart2 } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardView from './views/DashboardView';
import AssetListView from './views/AssetListView';
import AssetProfileView from './views/AssetProfileView';
import InventoryOperationsView from './views/InventoryOperationsView';
import AssetOverview from './views/AssetOverview';
import CostAccountingView from './views/CostAccountingView';
import WorkOrderOverview from './views/WorkOrderOverview';
import WorkOrderListView from './views/WorkOrderListView';
import RepairManagementView from './views/RepairManagementView';
import InspectionPlanView from './views/InspectionPlanView';
import DecisionSupportView from './views/DecisionSupportView';
import SpecialView from './views/SpecialView';
import PropertyManagementView from './views/PropertyManagementView';
import BRTUnattendedView from './views/BRTUnattendedView';
import IntegratedMonitoringView from './views/IntegratedMonitoringView';
import NetworkMonitoringView from './views/NetworkMonitoringView';
import { 
  SafetyCockpit, 
  SafetyPrevention, 
  SafetyMonitoring, 
  StationSafety 
} from './views/SafetyManagementView';
import { 
  EmergencyCommandView, 
  EmergencyRiskView, 
  EmergencyPlanView, 
  EmergencyResourcesView
} from './views/EmergencyManagementView';
import {
  MaintenanceDashboard,
  MaintenanceScheduling,
  MaintenanceInspections,
  MaintenanceSpares,
  MaintenanceKnowledge
} from './views/MaintenanceEngineView';
import { MENU_STRUCTURE } from './constants';

export default function SmartBusOpsPlatform() {
  const [activeMenu, setActiveMenu] = useState('cockpit-integrated');
  const [expandedMenus, setExpandedMenus] = useState(['cockpit', 'maintenance', 'emergency', 'special']);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const renderContent = () => {
    if (selectedAssetId) {
      return <AssetProfileView assetId={selectedAssetId} onBack={() => setSelectedAssetId(null)} />;
    }

    switch (activeMenu) {
      // Cockpit Modules
      case 'cockpit-integrated': return <IntegratedMonitoringView />;
      case 'cockpit-network': return <NetworkMonitoringView />;
      case 'cockpit-energy': return <DashboardView />;

      // Preventative Maintenance Engine
      case 'maintenance-dashboard': return <MaintenanceDashboard />;
      case 'maintenance-scheduling': return <MaintenanceScheduling />;
      case 'maintenance-inspections': return <MaintenanceInspections />;
      case 'maintenance-spares': return <MaintenanceSpares />;
      case 'maintenance-knowledge': return <MaintenanceKnowledge />;

      // Emergency Management Center
      case 'emergency-command': return <EmergencyCommandView />;
      case 'emergency-risk': return <EmergencyRiskView />;
      case 'emergency-plan': return <EmergencyPlanView />;
      case 'emergency-resources': return <EmergencyResourcesView />;

      // Safety Management Center
      case 'safety-cockpit': return <SafetyCockpit />;
      case 'safety-prevention': return <SafetyPrevention />;
      case 'safety-monitoring': return <SafetyMonitoring />;
      case 'safety-station': return <StationSafety />;
      case 'safety-analysis': return (
        <div className="flex items-center justify-center h-[400px] text-slate-400 bg-white rounded-xl border border-slate-200">
           <div className="text-center">
              <BarChart2 size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-bold text-slate-600 mb-2">安全事故复盘与分析</h3>
              <p className="text-sm text-slate-500">该模块正在接入历史事故库数据，预计 11 月正式上线。</p>
           </div>
        </div>
      );

      // Asset & Work Order Modules
      case 'asset-overview': return <AssetOverview />;
      case 'asset-list': return <AssetListView onSelectAsset={setSelectedAssetId} />;
      case 'asset-inventory': return <InventoryOperationsView />;
      case 'wo-overview': return <WorkOrderOverview />;
      case 'wo-list': return <WorkOrderListView />;
      case 'wo-repair': return <RepairManagementView />;
      case 'wo-inspection': return <InspectionPlanView />;
      case 'cost-revenue':
      case 'cost-calc': return <CostAccountingView />;
      case 'decision-efficiency':
      case 'decision-wo-analysis':
      case 'decision-fault-tree': return <DecisionSupportView />;
      
      // Special Topics
      case 'special-brt': return <SpecialView />;
      case 'special-brt-unattended': return <BRTUnattendedView />;
      case 'special-property': return <PropertyManagementView />;
      
      default: return <DashboardView />;
    }
  };

  const activeParentMenu = MENU_STRUCTURE.find(m => m.children?.some(c => c.id === activeMenu));
  const activeChildMenu = MENU_STRUCTURE.flatMap(m => m.children || []).find(c => c.id === activeMenu);

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8FAFC] text-slate-600 font-sans overflow-hidden selection:bg-blue-100 selection:text-blue-800">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeMenu={activeMenu} 
          setActiveMenu={(menu) => { setActiveMenu(menu); setSelectedAssetId(null); }} 
          expandedMenus={expandedMenus} 
          toggleMenu={toggleMenu} 
        />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 relative">
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium">
              <span className="hover:text-slate-600 cursor-pointer">首页</span>
              <ChevronRight size={12} />
              <span className="text-blue-600 font-bold">{activeParentMenu?.title}</span>
              <ChevronRight size={12} />
              <span className="text-slate-600">
                {selectedAssetId ? '全息画像' : activeChildMenu?.title}
              </span>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
