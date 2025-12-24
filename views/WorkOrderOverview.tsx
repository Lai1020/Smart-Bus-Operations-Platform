
import React from 'react';
import { 
  FileText, Timer, CheckCircle, AlertCircle, BarChart3, PieChart, 
  Users, Activity, TrendingUp, TrendingDown 
} from 'lucide-react';

const WorkOrderOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '今日新增工单', value: '28', trend: '+12%', isUp: true, icon: <FileText size={20}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '平均修复时长', value: '4.2h', trend: '-8%', isUp: false, icon: <Timer size={20}/>, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '工单完成率', value: '94.5%', trend: '+1.2%', isUp: true, icon: <CheckCircle size={20}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '当前积压', value: '5', trend: '+2', isUp: true, bad: true, icon: <AlertCircle size={20}/>, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">{item.label}</p>
              <h3 className="text-3xl font-bold text-slate-800">{item.value}</h3>
              <div className={`flex items-center text-xs font-bold mt-1 ${item.bad ? 'text-rose-500' : (item.isUp ? 'text-emerald-500' : 'text-slate-400')}`}>
                {item.isUp ? <TrendingUp size={12} className="mr-1"/> : <TrendingDown size={12} className="mr-1"/>}
                {item.trend} <span className="text-slate-400 font-normal ml-1">较昨日</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: 7-Day Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="text-blue-600"/> 近7日工单趋势分析
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 报修量</span>
              <span className="flex items-center gap-1 text-xs text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> 完成量</span>
            </div>
          </div>
          
          <div className="h-64 w-full relative flex items-end justify-between px-4 pb-6 border-b border-slate-100">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              {[40, 30, 20, 10, 0].map(val => (
                <div key={val} className="w-full h-px bg-slate-50 border-t border-dashed border-slate-100 relative">
                  <span className="absolute -left-6 -top-2 text-[10px] text-slate-300">{val}</span>
                </div>
              ))}
            </div>
            
            {/* Bars */}
            {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, i) => {
              const h1 = Math.floor(Math.random() * 60) + 20 + '%';
              const h2 = Math.floor(Math.random() * 50) + 20 + '%';
              return (
                <div key={day} className="relative z-10 flex flex-col items-center gap-1 w-1/12 h-full justify-end group">
                  <div className="w-full flex gap-1 items-end h-full">
                    <div style={{height: h1}} className="flex-1 bg-blue-500 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"></div>
                    <div style={{height: h2}} className="flex-1 bg-emerald-400 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"></div>
                  </div>
                  <span className="text-xs text-slate-400 mt-2">{day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Donut Chart: Issue Types */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
            <PieChart className="text-purple-600"/> 故障类型分布
          </h3>
          <div className="flex-1 flex items-center justify-center relative">
             <div className="w-48 h-48 rounded-full relative" style={{
               background: 'conic-gradient(#3b82f6 0% 35%, #10b981 35% 60%, #f59e0b 60% 80%, #ef4444 80% 100%)'
             }}>
                <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
                   <span className="text-3xl font-bold text-slate-800">142</span>
                   <span className="text-xs text-slate-400">本月总计</span>
                </div>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500"></div> 车载设备 (35%)</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500"></div> 场站设施 (25%)</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500"></div> 供电系统 (20%)</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500"></div> 其他 (20%)</div>
          </div>
        </div>
      </div>

      {/* 3. Performance & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Team Performance */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
               <Users className="text-orange-500"/> 本周维修之星 (Top 5)
            </h3>
            <div className="space-y-4">
               {[
                 { name: '李强', score: 98, count: 15, role: '高级电工' },
                 { name: '王建国', score: 96, count: 12, role: 'IT运维' },
                 { name: '张伟', score: 94, count: 11, role: '车辆技师' },
               ].map((user, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          i===0 ? 'bg-yellow-400' : 'bg-slate-200'
                       }`}>
                          {i+1}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-700">{user.name}</p>
                          <p className="text-[10px] text-slate-400">{user.role}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-bold text-blue-600">{user.count} 单</p>
                       <p className="text-[10px] text-emerald-500 font-bold">{user.score}分</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Efficiency Heatmap */}
         <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
               <Activity className="text-rose-500"/> 维修工时热力图 (时段分布)
            </h3>
            <div className="flex flex-col gap-1">
               {['08:00', '12:00', '16:00', '20:00'].map((time) => (
                  <div key={time} className="flex items-center gap-2">
                     <span className="text-[10px] text-slate-400 w-8 text-right">{time}</span>
                     <div className="flex-1 flex gap-1">
                        {Array.from({length: 24}).map((_, colIdx) => (
                           <div key={colIdx} className={`flex-1 h-6 rounded-sm ${Math.random() > 0.5 ? 'bg-blue-500' : 'bg-slate-100'} opacity-80 transition-opacity`}></div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default WorkOrderOverview;
