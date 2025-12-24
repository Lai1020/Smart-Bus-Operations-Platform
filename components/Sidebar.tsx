
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MENU_STRUCTURE } from '../constants';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  expandedMenus: string[];
  toggleMenu: (menuId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu, expandedMenus, toggleMenu }) => (
  <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
    <div className="p-4">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">主导航</p>
      <div className="space-y-1.5">
        {MENU_STRUCTURE.map((menu) => (
          <div key={menu.id}>
            <button
              onClick={() => toggleMenu(menu.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                expandedMenus.includes(menu.id) 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {menu.icon}
                <span>{menu.title}</span>
              </div>
              {expandedMenus.includes(menu.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            
            {expandedMenus.includes(menu.id) && (
              <div className="mt-1 ml-4 pl-3 border-l border-slate-200 space-y-1">
                {menu.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setActiveMenu(child.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeMenu === child.id 
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {child.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </aside>
);

export default Sidebar;
