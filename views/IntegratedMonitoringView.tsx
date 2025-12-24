
import React, { useState } from 'react';
import {
  Video, ArrowRightLeft, Target, Layers, Shield, Footprints, ZapOff,
  Wrench, Droplet, ParkingSquare, BatteryCharging, Cpu, Map, ListTodo,
  User, Users2, Gauge, Wifi, Zap, Activity, AlertTriangle, Clock, XCircle, Siren, Building2, Minimize2, Truck
} from 'lucide-react';

// --- Station Monitor Sub-component ---
const StationMonitor = () => {
  const [activeStation, setActiveStation] = useState('ronghui');
  const [scenarioMode, setScenarioMode] = useState('standard');
  
  const stations = [
    { id: 'ronghui', name: '茸惠路停保场' },
    { id: 'chengdong', name: '城东停保场' },
    { id: 'daxuecheng', name: '大学城枢纽站' }
  ];

  const scenarios = [
    { id: 'standard', label: '标准视图', icon: <Layers size={14}/>, color: 'blue' },
    { id: 'safety', label: '安全管控', icon: <Shield size={14}/>, color: 'red' },
    { id: 'process', label: '作业流程', icon: <Footprints size={14}/>, color: 'orange' },
    { id: 'energy', label: '能耗热力', icon: <ZapOff size={14}/>, color: 'emerald' },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-blue-100 shadow-sm">
        <div className="flex gap-2">
          {stations.map(s => (
            <button 
              key={s.id}
              onClick={() => setActiveStation(s.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeStation === s.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
           {scenarios.map(mode => (
             <button
               key={mode.id}
               onClick={() => setScenarioMode(mode.id)}
               className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-2 ${scenarioMode === mode.id ? `bg-${mode.color}-500 text-white shadow-sm` : 'text-slate-500 hover:bg-white'}`}
             >
               {mode.icon} {mode.label}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 h-[650px]">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Video className="text-blue-500" size={18}/> 重点区域视频</h3>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {['东门进场闸机','维保车间A区','自动洗车机','充电桩全景'].map((t,i)=>(
                <div key={i} className="bg-slate-900 rounded relative overflow-hidden group">
                   <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600"><Video size={24}/></div>
                   <div className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-1 rounded animate-pulse">REC</div>
                   <div className="absolute bottom-0 w-full bg-black/50 text-white text-[8px] p-1 truncate">{t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-1/3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><ArrowRightLeft className="text-blue-500" size={18}/> 进出场无感通行</h3>
             <div className="space-y-2 text-[10px]">
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded border-l-2 border-emerald-500">
                   <div><p className="font-bold text-slate-700 text-xs">松江15路 (入场)</p><p className="text-slate-400">车牌+UWB双重认证</p></div>
                   <span className="text-emerald-600 font-bold">自动放行</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded border-l-2 border-blue-500">
                   <div><p className="font-bold text-slate-700 text-xs">松江22路 (出场)</p><p className="text-slate-400">调度指令匹配成功</p></div>
                   <span className="text-blue-600 font-bold">已出场</span>
                </div>
             </div>
          </div>
        </div>

        <div className="col-span-6 bg-slate-900 rounded-xl border border-slate-700 p-0 relative overflow-hidden flex flex-col shadow-lg group">
           <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
           <div className="absolute top-0 w-full p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent z-10">
              <div>
                <h3 className="font-bold text-white flex items-center gap-2"><Target className="text-cyan-400"/> 茸惠路停保场·数字孪生</h3>
                <p className="text-slate-400 text-xs">全域感知模式 | UWB精度: ±10cm</p>
              </div>
           </div>
           <div className="flex-1 relative p-8 mt-12 flex flex-col gap-4">
              <div className="flex gap-4 h-1/3">
                 <div className={`w-2/3 border rounded-lg p-2 relative bg-slate-800/50 border-slate-600`}>
                    <span className="absolute top-2 left-2 text-[10px] text-slate-400 font-bold flex items-center gap-1"><Wrench size={10}/> 维保车间</span>
                 </div>
                 <div className={`w-1/3 border rounded-lg p-2 relative flex items-center justify-center bg-slate-800/50 border-slate-600`}>
                    <span className="absolute top-2 left-2 text-[10px] text-slate-400 font-bold flex items-center gap-1"><Droplet size={10}/> 洗车区</span>
                 </div>
              </div>
              <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg p-4 relative grid grid-cols-6 grid-rows-4 gap-2">
                 <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-[10px] text-slate-400 font-bold flex items-center gap-1"><ParkingSquare size={10}/> 综合停车区</span>
                 {Array.from({length:24}).map((_,i) => {
                   const hasCar = i !== 5 && i !== 12 && i !== 20; 
                   const isCharging = i < 6;
                   return (
                     <div key={i} className={`border border-slate-700 rounded relative flex items-center justify-center z-10`}>
                        {hasCar ? <div className={`w-[80%] h-[70%] rounded ${isCharging ? 'bg-emerald-600' : 'bg-blue-600'} shadow-lg`}></div> : null}
                     </div>
                   )
                 })}
              </div>
           </div>
           <div className="h-8 bg-slate-800 border-t border-slate-700 flex items-center px-4 text-[10px] text-slate-400 justify-between">
              <div className="flex gap-4">
                 <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> 普通停放</span>
                 <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div> 充电中</span>
              </div>
              <span className="font-mono text-cyan-500">UWB延迟: 12ms</span>
           </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
           <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><BatteryCharging className="text-blue-500" size={18}/> 智能充电桩</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                 <div className="bg-blue-50 p-2 rounded-lg text-center"><p className="text-[10px] text-slate-500">充电中</p><p className="text-xl font-bold text-blue-600">12</p></div>
                 <div className="bg-slate-50 p-2 rounded-lg text-center"><p className="text-[10px] text-slate-500">待调度</p><p className="text-xl font-bold text-slate-600">3</p></div>
              </div>
              <div className="space-y-2">
                 {[1,2,3].map(i=>(
                    <div key={i} className="flex items-center justify-between text-[10px]">
                       <span className="text-slate-600 font-mono">桩#0{i}</span>
                       <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{width: '80%'}}></div></div>
                       <span className="text-emerald-600 font-bold">80%</span>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className={`h-48 rounded-xl p-4 text-white flex flex-col justify-between shadow-lg relative overflow-hidden bg-blue-600`}>
              <h3 className="font-bold flex items-center gap-2 relative z-10"><Cpu size={18}/> 智能决策助手</h3>
              <div className="bg-black/20 p-3 rounded text-[10px] font-medium mb-2 relative z-10 leading-relaxed">
                  &gt; 建议：今日进场高峰预计18:30开始<br/>
                  &gt; 提醒：3辆车待安排一级保养
              </div>
              <button className="text-xs bg-white/20 hover:bg-white/30 py-1.5 rounded transition-colors text-center relative z-10 font-bold">执行调度建议</button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Operation Monitor Sub-component ---
const OperationMonitor = () => {
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const vehicles = [
     { id: '沪A-39921', route: '松江22路', speed: 45, fuel: '电 68%', status: '正常', lat: 30, lng: 50, uwb: '在线' },
     { id: '沪A-10293', route: '松江3路', speed: 0, fuel: '电 40%', status: '到站必停', lat: 60, lng: 30, uwb: '信号弱' },
     { id: '沪A-55821', route: '松江15路', speed: 52, fuel: '电 12%', status: '越站告警', alert: true, lat: 45, lng: 70, uwb: '在线' },
  ];

  return (
    <div className="h-[650px] flex gap-4 animate-fade-in">
       <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-slate-200" style={{backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-lg border border-slate-200 shadow-md z-10">
             <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm"><Map size={14} className="text-blue-600"/> 松江区营运GIS调度图</h3>
          </div>
          {vehicles.map((v, i) => (
             <div key={i} onClick={() => setSelectedBus(v)} className={`absolute cursor-pointer transition-all hover:scale-110 ${v.alert ? 'animate-bounce' : ''}`} style={{ top: `${v.lat}%`, left: `${v.lng}%` }}>
                <div className={`p-2 rounded-full border-2 text-white shadow-lg flex items-center justify-center ${v.alert ? 'bg-red-500 border-white' : 'bg-blue-600 border-white'}`}>
                   <Truck size={18} />
                </div>
             </div>
          ))}
       </div>

       <div className="w-80 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm"><ListTodo size={16} className="text-blue-500"/> 营运车辆列表</h3>
             <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar text-[10px]">
                {vehicles.map((v, i) => (
                   <div key={i} onClick={() => setSelectedBus(v)} className={`p-2 rounded border cursor-pointer transition-colors ${selectedBus?.id === v.id ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex justify-between items-center mb-1 font-bold text-slate-700">{v.route} - {v.id}</div>
                      <div className="flex justify-between text-slate-500"><span>速度: {v.speed} km/h</span><span>{v.fuel}</span></div>
                   </div>
                ))}
             </div>
          </div>
          {selectedBus ? (
             <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-4 animate-fade-in text-[10px]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                   <h3 className="font-bold text-slate-800">{selectedBus.id}</h3>
                   <span className={`px-2 py-0.5 rounded font-bold ${selectedBus.alert ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>{selectedBus.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <div className="bg-black rounded h-20 flex flex-col items-center justify-center text-slate-500 relative">
                      <User size={20}/><span className="absolute bottom-1 left-1 text-[6px] text-white">DSM</span>
                   </div>
                   <div className="bg-black rounded h-20 flex flex-col items-center justify-center text-slate-500 relative">
                      <Users2 size={20}/><span className="absolute bottom-1 left-1 text-[6px] text-white">ADAS</span>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <div className="p-2 bg-slate-50 rounded border border-slate-100">
                      <p className="text-slate-400">实时车速</p>
                      <p className="font-bold text-slate-800 text-sm flex items-center gap-1"><Gauge size={12}/> {selectedBus.speed}</p>
                   </div>
                   <div className="p-2 bg-slate-50 rounded border border-slate-100">
                      <p className="text-slate-400">UWB状态</p>
                      <p className="font-bold text-blue-600 text-sm flex items-center gap-1"><Wifi size={12}/> {selectedBus.uwb}</p>
                   </div>
                </div>
             </div>
          ) : (
             <div className="flex-1 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[10px]">
                点击地图车辆查看详情
             </div>
          )}
       </div>
    </div>
  );
};

// --- Main Integrated Monitoring View ---
const IntegratedMonitoringView = () => {
  const [activeTab, setActiveTab] = useState<'station' | 'operation'>('station');

  return (
    <div className="space-y-6">
      <div className="bg-white p-1 rounded-xl border border-slate-200 inline-flex shadow-sm">
         <button 
           onClick={() => setActiveTab('station')}
           className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'station' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
         >
           <Building2 size={18}/> 智慧场站综合监控
         </button>
         <button 
           onClick={() => setActiveTab('operation')}
           className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'operation' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
         >
           <Map size={18}/> 营运调度综合监控
         </button>
      </div>
      {activeTab === 'station' ? <StationMonitor /> : <OperationMonitor />}
    </div>
  );
};

export default IntegratedMonitoringView;
