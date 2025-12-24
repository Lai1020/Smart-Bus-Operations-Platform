
import React from 'react';
import { 
  Box, Coins, Activity, Trash2, TrendingUp, TrendingDown, PieChart, 
  BarChart3, Shield, LayoutDashboard, Plus, RefreshCw 
} from 'lucide-react';

const AssetOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '资产总数', value: '12,845', sub: '个', trend: '+123', isUp: true, icon: <Box size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '资产总估值', value: '4.52', sub: '亿元', trend: '+0.5%', isUp: true, icon: <Coins size={20}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '综合完好率', value: '96.2%', sub: '', trend: '-0.3%', isUp: false, icon: <Activity size={20}/>, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: '待处置/报废', value: '38', sub: '个', trend: '+2', isUp: true, bad: true, icon: <Trash2 size={20}/>, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">{item.label}</p>
              <div className="flex items-baseline gap-1">
                 <h3 className="text-3xl font-bold text-slate-800">{item.value}</h3>
                 <span className="text-xs text-slate-400 font-bold">{item.sub}</span>
              </div>
              <div className={`flex items-center text-xs font-bold mt-1 ${item.bad ? 'text-amber-500' : (item.isUp ? 'text-emerald-500' : 'text-slate-400')}`}>
                {item.isUp ? <TrendingUp size={12} className="mr-1"/> : <TrendingDown size={12} className="mr-1"/>}
                {item.trend} <span className="text-slate-400 font-normal ml-1">较上月</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="text-blue-600"/> 资产分类与价值分布
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 数量占比</span>
              <span className="flex items-center gap-1 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-indigo-300"></div> 价值占比</span>
            </div>
          </div>
          
          <div className="h-64 w-full relative flex items-end justify-between px-4 pb-6 border-b border-slate-100">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {[100, 75, 50, 25, 0].map(val => (
                <div key={val} className="w-full h-px bg-slate-50 border-t border-dashed border-slate-100 relative">
                  <span className="absolute -left-6 -top-2 text-[10px] text-slate-300">{val}%</span>
                </div>
              ))}
            </div>
            
            {/* Bars */}
            {[
               {label: '营运车辆', h1: '80%', h2: '90%'},
               {label: 'IT设施', h1: '40%', h2: '20%'},
               {label: '场站设施', h1: '60%', h2: '50%'},
               {label: '维修工具', h1: '30%', h2: '10%'},
               {label: '办公用品', h1: '20%', h2: '5%'},
               {label: '其他资产', h1: '15%', h2: '5%'}
            ].map((item, i) => {
              return (
                <div key={i} className="relative z-10 flex flex-col items-center gap-1 w-1/12 h-full justify-end group">
                  <div className="w-full flex gap-1 items-end h-full">
                    <div style={{height: item.h1}} className="flex-1 bg-blue-500 rounded-t-sm opacity-90 group-hover:opacity-100 transition-all"></div>
                    <div style={{height: item.h2}} className="flex-1 bg-indigo-300 rounded-t-sm opacity-90 group-hover:opacity-100 transition-all"></div>
                  </div>
                  <span className="text-xs text-slate-500 mt-2 truncate w-16 text-center">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
            <PieChart className="text-purple-600"/> 全生命周期状态分布
          </h3>
          <div className="flex-1 flex items-center justify-center relative">
             <div className="w-48 h-48 rounded-full relative" style={{
               background: 'conic-gradient(#10b981 0% 65%, #3b82f6 65% 85%, #f59e0b 85% 95%, #94a3b8 95% 100%)'
             }}>
                <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
                   <span className="text-3xl font-bold text-slate-800">12K</span>
                   <span className="text-xs text-slate-400">资产总数</span>
                </div>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500"></div> 运营中 (65%)</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500"></div> 维修中 (20%)</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500"></div> 闲置 (10%)</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-400"></div> 待报废 (5%)</div>
          </div>
        </div>
      </div>

      {/* 3. Health Ranking & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Low Health Ranking */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Shield className="text-rose-500"/> 资产健康预警 (Top 5 低分)
               </h3>
               <button className="text-xs text-blue-600 font-medium hover:underline">查看全部</button>
            </div>
            
            <div className="space-y-3">
               {[
                 { id: 'BUS-8821', score: 62, name: '纯电动客车 (宇通)', issue: '发动机异常震动', dept: '客运一部' },
                 { id: 'DEV-Gate-02', score: 68, name: '智能闸机 #02', issue: '响应延迟 > 3s', dept: '信息部' },
                 { id: 'PWR-Box-A1', score: 71, name: '配电箱 A1', issue: '温度持续偏高', dept: '基建部' },
                 { id: 'BUS-9901', score: 74, name: '纯电动客车 (比亚迪)', issue: '续航衰减明显', dept: '客运二部' },
                 { id: 'SRV-Main-01', score: 78, name: '核心数据库服务器', issue: '硬盘IO告警', dept: '信息部' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-rose-50 hover:border-rose-100 transition-colors group">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">
                          {item.score}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-700">{item.name}</p>
                          <p className="text-xs text-slate-400 group-hover:text-rose-500">{item.issue}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-mono text-slate-500">{item.id}</p>
                       <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{item.dept}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Quick Actions / Recent */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
               <LayoutDashboard className="text-blue-500"/> 快捷入口与近期动态
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
               <button className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex flex-col items-center justify-center gap-2 hover:bg-blue-100 transition-colors group">
                  <div className="p-2 bg-blue-200 text-blue-700 rounded-full group-hover:scale-110 transition-transform"><Plus size={20}/></div>
                  <span className="text-sm font-bold text-blue-800">资产入库</span>
               </button>
               <button className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col items-center justify-center gap-2 hover:bg-emerald-100 transition-colors group">
                  <div className="p-2 bg-emerald-200 text-emerald-700 rounded-full group-hover:scale-110 transition-transform"><RefreshCw size={20}/></div>
                  <span className="text-sm font-bold text-emerald-800">盘点作业</span>
               </button>
            </div>

            <div className="flex-1 overflow-y-auto">
               <p className="text-xs font-bold text-slate-400 uppercase mb-3">近期资产变动</p>
               <div className="space-y-4">
                  {[
                     { user: '张三', action: '领用了', target: '手持POS机 V2', time: '10分钟前' },
                     { user: '李四', action: '报修了', target: '71路-沪A9921', time: '35分钟前' },
                     { user: '系统', action: '自动入库', target: '采购合同 HT-2024-001 批次', time: '2小时前' },
                  ].map((log, i) => (
                     <div key={i} className="flex gap-3 text-sm">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        <div>
                           <p className="text-slate-600"><span className="font-bold text-slate-800">{log.user}</span> {log.action} <span className="font-bold text-blue-600">{log.target}</span></p>
                           <p className="text-[10px] text-slate-400">{log.time}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AssetOverview;
