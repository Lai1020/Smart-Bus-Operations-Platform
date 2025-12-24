
import React from 'react';
import { Cpu, Zap, Wrench, AlertTriangle, Video, AlertCircle } from 'lucide-react';

const DashboardView: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Top Metrics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: '在线设备总数', value: '12,845', unit: '个', icon: <Cpu />, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        { label: '今日能耗 (kWh)', value: '45,230', unit: 'kWh', icon: <Zap />, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
        { label: '活跃工单', value: '142', unit: '单', icon: <Wrench />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
        { label: '紧急告警', value: '3', unit: '条', icon: <AlertTriangle />, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', animate: true },
      ].map((item, idx) => (
        <div key={idx} className={`bg-white rounded-xl p-5 border ${item.border} shadow-sm flex items-center justify-between transition-shadow hover:shadow-md`}>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">{item.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className={`text-2xl font-bold ${item.color} ${item.animate ? 'animate-pulse' : ''}`}>{item.value}</h3>
              <span className="text-xs text-slate-400">{item.unit}</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>

    {/* Main Content Area: Map & Live Feeds */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
      {/* Map Section */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col relative shadow-sm">
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur border border-slate-200 rounded-lg p-2 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-700 font-bold">全网监控正常</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between gap-4 text-xs">
              <span className="text-slate-500">场站A温度</span>
              <span className="text-emerald-600 font-medium">24°C</span>
            </div>
            <div className="flex justify-between gap-4 text-xs">
              <span className="text-slate-500">场站B湿度</span>
              <span className="text-blue-600 font-medium">60%</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-slate-100 relative">
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }}></div>
          <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] border-2 border-white"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] border-2 border-white"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_#ef4444] animate-ping"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          
          <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded text-xs text-slate-500 border border-slate-200 shadow-sm">
             GIS地图视图 (模拟)
          </div>
        </div>
        
        <div className="h-12 bg-white border-t border-slate-100 flex items-center px-4 justify-between">
           <span className="text-sm text-slate-600 font-bold">区域视图：主城区 BRT 1号线</span>
           <div className="flex gap-2">
             <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-500 shadow-sm shadow-blue-200">实时追踪</button>
             <button className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded hover:bg-slate-200">历史回放</button>
           </div>
        </div>
      </div>

      {/* Side Panels */}
      <div className="flex flex-col gap-4">
        {/* Video Feeds */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Video size={16} className="text-blue-500"/> 重点区域监控
            </h3>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">4路在线</span>
          </div>
          <div className="grid grid-cols-2 gap-2 flex-1">
             {[1,2,3,4].map(i => (
               <div key={i} className="bg-slate-800 rounded border border-slate-200 relative overflow-hidden group">
                 <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">摄像头 {i}</div>
                 <div className="absolute bottom-1 right-1 px-1 bg-red-600 text-[10px] text-white rounded">Live</div>
               </div>
             ))}
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 flex flex-col shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
            <AlertCircle size={16} className="text-amber-500"/> 实时告警
          </h3>
          <div className="space-y-3 overflow-y-auto flex-1 custom-scrollbar">
             {[
               { time: '10:42', msg: '3号场站配电箱温度异常', level: 'high' },
               { time: '10:38', msg: '公交车沪A-88291 胎压告警', level: 'medium' },
               { time: '10:15', msg: '5号门禁系统离线', level: 'low' },
             ].map((alert, idx) => (
               <div key={idx} className={`flex gap-3 items-start p-2 rounded border transition-colors ${
                 alert.level === 'high' ? 'bg-red-50 border-red-100' :
                 alert.level === 'medium' ? 'bg-amber-50 border-amber-100' :
                 'bg-blue-50 border-blue-100'
               }`}>
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                    alert.level === 'high' ? 'bg-red-500' : alert.level === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="text-xs font-medium text-slate-700">{alert.msg}</p>
                    <p className="text-[10px] text-slate-400">{alert.time}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardView;
