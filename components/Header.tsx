
import React from 'react';
import { Activity, Search, Bell, User } from 'lucide-react';

const Header: React.FC = () => (
  <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 text-slate-800 shrink-0 z-20 shadow-sm sticky top-0">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
        <Activity size={20} className="text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
          公交集团智能运维平台
        </h1>
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] leading-none">Intelligent Operation System</p>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="全局搜索资产、工单..." 
          className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-64 transition-all"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors hover:bg-slate-50 rounded-lg">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group">
          <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
            <User size={18} />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-bold text-slate-700">管理员</p>
            <p className="text-xs text-slate-500">运维指挥中心</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
