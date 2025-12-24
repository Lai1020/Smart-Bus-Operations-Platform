
import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  Map as MapIcon, 
  Users, 
  AlertTriangle, 
  Phone, 
  Unlock, 
  Mic, 
  Video, 
  Activity,
  X,
  CheckCircle,
  Settings,
  Bus,
  Search,
  Filter,
  Clock,
  MapPin,
  Wrench,
  Shield,
  Trash2,
  MoreHorizontal
} from 'lucide-react';

// --- 模拟数据 ---

const INITIAL_STATIONS = [
  { id: 1, name: '沈杜公路站 (起)', status: 'warning', crowd: '高', temp: '24°C', devices: '正常', camUrl: 'static' },
  { id: 2, name: '东方体育中心', status: 'normal', crowd: '中', temp: '23°C', devices: '正常', camUrl: 'static' },
  { id: 3, name: '海湾路站', status: 'normal', crowd: '低', temp: '22°C', devices: '正常', camUrl: 'static' },
  { id: 4, name: '金海路站', status: 'normal', crowd: '低', temp: '23°C', devices: '正常', camUrl: 'static' },
  { id: 5, name: '贤浦路站', status: 'alert', crowd: '低', temp: '25°C', devices: '故障', camUrl: 'static' },
  { id: 6, name: '南桥汽车站 (终)', status: 'normal', crowd: '中', temp: '24°C', devices: '正常', camUrl: 'static' },
];

const INITIAL_LOGS = [
  { id: 101, time: '08:30:15', station: '沈杜公路站', type: 'crowd', msg: '站台客流密度超过警戒值 (3人/m²)' },
  { id: 102, time: '08:32:04', station: '贤浦路站', type: 'device', msg: '2号闸机电机响应超时' },
];

const INITIAL_ALERTS = [
  { id: 'AL-20240520-01', level: 'critical', station: '贤浦路站', device: '2号进站闸机', type: '硬件故障', status: 'pending', time: '08:32:04', desc: '电机响应超时，扇门无法关闭' },
  { id: 'AL-20240520-02', level: 'warning', station: '沈杜公路站', device: 'AI客流分析', type: '客流拥堵', status: 'processing', time: '08:30:15', desc: '站台滞留人数超过50人' },
  { id: 'AL-20240520-03', level: 'info', station: '金海路站', device: '环境传感器', type: '温度异常', status: 'resolved', time: '07:45:10', desc: '机房温度略高 (28°C)' },
  { id: 'AL-20240520-04', level: 'critical', station: '南桥汽车站', device: 'SOS终端', type: '乘客求助', status: 'resolved', time: '07:12:33', desc: '老人无法刷卡进站' },
];

const INITIAL_STAFF = [
  { id: 'S-01', name: '巡检1组 (张伟/李强)', role: 'maintenance', vehicle: '沪A·BJ102 (工程车)', location: '沈杜公路站', status: 'busy', task: '修复闸机故障' },
  { id: 'S-02', name: '特勤组 (王大力)', role: 'security', vehicle: '沪A·PF110 (摩托)', location: '东方体育中心', status: 'idle', task: '待命' },
  { id: 'S-03', name: '保洁2组 (赵阿姨)', role: 'cleaning', vehicle: '沪A·HJ003 (电动三轮)', location: '海湾路站', status: 'working', task: '站台日常保洁' },
  { id: 'S-04', name: '巡检2组 (刘工)', role: 'maintenance', vehicle: '沪A·BJ105 (工程车)', location: '金海路站', status: 'moving', task: '前往南桥站巡查' },
];

const BRTUnattendedView = () => {
  const [activeTab, setActiveTab] = useState('monitor'); // monitor, map, alerts, maintenance, staff
  const [stations, setStations] = useState(INITIAL_STATIONS);
  const [selectedStation, setSelectedStation] = useState(stations[0]);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [incomingCall, setIncomingCall] = useState<any>(null); 
  const [isTalking, setIsTalking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const simulateIncident = () => {
    const randomStation = stations[Math.floor(Math.random() * stations.length)];
    const newCall = {
      id: Date.now(),
      stationId: randomStation.id,
      stationName: randomStation.name,
      reason: '票卡失效求助',
      passengerImg: '👤', 
    };
    setIncomingCall(newCall);
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString('zh-CN', {hour12: false}),
      station: randomStation.name,
      type: 'call',
      msg: '乘客发起可视对讲请求'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleOpenGate = () => {
    if (!incomingCall) return;
    alert(`已向 [${incomingCall.stationName}] 发送远程开闸指令，闸机已释放。`);
    setIncomingCall(null);
    setIsTalking(false);
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString('zh-CN', {hour12: false}),
      station: incomingCall.stationName,
      type: 'action',
      msg: '中控员执行远程开闸操作'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleEndCall = () => {
    setIncomingCall(null);
    setIsTalking(false);
  };

  // --- 子视图渲染 ---

  const renderMonitorView = () => (
    <div className="flex-1 flex overflow-hidden bg-slate-50 animate-fade-in">
      {/* 左侧：站点列表 */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input type="text" placeholder="搜索站点..." className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 pl-9 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"/>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {stations.map(station => (
            <div 
              key={station.id}
              onClick={() => setSelectedStation(station)}
              className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${selectedStation.id === station.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`font-bold text-sm ${selectedStation.id === station.id ? 'text-blue-900' : 'text-slate-700'}`}>{station.name}</span>
                <StatusBadge status={station.status} />
              </div>
              <div className="flex gap-3 text-[10px] text-slate-500 font-bold">
                <span className="flex items-center gap-1"><Users size={10}/> {station.crowd}</span>
                <span className="flex items-center gap-1"><Activity size={10}/> {station.temp}</span>
                <span className="flex items-center gap-1"><Monitor size={10}/> {station.devices}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 中间：视频监控与全线地图 */}
      <div className="flex-1 bg-slate-100 p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
        
        {/* 全线 GIS 运行地图 */}
        <div className="h-44 bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col p-4 shrink-0">
          <div className="flex justify-between items-center mb-4 z-10 relative">
             <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded border border-blue-100 flex items-center gap-1.5 shadow-sm">
                <MapPin size={12}/> 全线 GIS 实时运行拓扑
             </div>
             <div className="flex gap-4 text-[10px] font-bold text-slate-400">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600"></div> 正常</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> 预警</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-600"></div> 故障</span>
             </div>
          </div>
          
          <div className="flex-1 relative flex items-center px-8">
             {/* Map background patterns */}
             <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>
             
             {/* Route Line */}
             <div className="absolute h-1.5 bg-slate-100 left-12 right-12 top-1/2 -translate-y-1/2 z-0 rounded-full">
                <div className="h-full bg-blue-100 w-full rounded-full opacity-50"></div>
             </div>
             
             {/* Station Markers */}
             <div className="relative w-full flex justify-between z-10">
                {stations.map((s, idx) => (
                   <div key={s.id} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => setSelectedStation(s)}>
                      <div className="relative">
                         {s.status === 'alert' && <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></div>}
                         {s.status === 'warning' && <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75"></div>}
                         <div className={`w-5 h-5 rounded-full border-4 border-white shadow-md transition-all ${
                            s.id === selectedStation.id ? 'bg-blue-600 scale-125 ring-4 ring-blue-100' : 
                            s.status === 'alert' ? 'bg-red-600' : 
                            s.status === 'warning' ? 'bg-amber-500' : 'bg-slate-400'
                         }`}></div>
                      </div>
                      <span className={`text-[10px] font-bold whitespace-nowrap px-1 rounded transition-colors ${s.id === selectedStation.id ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>
                         {s.name.split(' ')[0]}
                      </span>
                   </div>
                ))}
             </div>
             
             {/* Moving Bus (Animated Decorator) */}
             <div className="absolute top-1/2 -translate-y-8 left-[35%] animate-[bounce_3s_infinite] pointer-events-none">
                <div className="bg-blue-600 text-white p-1 rounded shadow-lg">
                   <Bus size={12}/>
                </div>
             </div>
          </div>
        </div>

        {/* 监控视频网格 */}
        <div className="grid grid-cols-2 gap-4 h-2/3">
          <div className="bg-black rounded-lg relative overflow-hidden group shadow-md border border-slate-800">
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] z-10 text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              {selectedStation.name} - 进站闸机
            </div>
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
               <Video size={48} className="opacity-20" />
            </div>
          </div>
          <div className="bg-black rounded-lg relative overflow-hidden shadow-md border border-slate-800">
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] z-10 text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              {selectedStation.name} - 站台全景
            </div>
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
               <Video size={48} className="opacity-20" />
            </div>
          </div>
          <div className="bg-black rounded-lg relative overflow-hidden shadow-md border border-slate-800">
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] z-10 text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              {selectedStation.name} - 出站区域
            </div>
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
               <Video size={48} className="opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg relative overflow-hidden shadow-sm border border-slate-200 p-6 flex flex-col justify-center gap-4">
              <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span className="text-slate-400 text-xs font-bold uppercase">今日客流</span>
                <span className="text-xl font-bold text-slate-800">12,450</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span className="text-slate-400 text-xs font-bold uppercase">设备状态</span>
                <span className="text-xl font-bold text-green-600">98.5%</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-slate-400 text-xs font-bold uppercase">实时能耗</span>
                <span className="text-xl font-bold text-blue-600">145 kW/h</span>
              </div>
          </div>
        </div>

        {/* 快捷操作区 */}
        <div className="h-1/3 bg-white rounded-lg border border-slate-200 p-4 flex gap-6 shadow-sm overflow-hidden shrink-0">
           <div className="flex-1">
             <h3 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2"><Settings size={12}/> 快捷操作 ({selectedStation.name})</h3>
             <div className="flex gap-2">
               <ControlButton icon={<Unlock size={16}/>} label="远程开进站" color="bg-blue-600" />
               <ControlButton icon={<Unlock size={16}/>} label="远程开出站" color="bg-blue-600" />
               <ControlButton icon={<Mic size={16}/>} label="全站广播" color="bg-amber-500" />
               <ControlButton icon={<AlertTriangle size={16}/>} label="紧急疏散" color="bg-red-600" />
             </div>
           </div>
           <div className="w-80 border-l border-slate-100 pl-6 flex flex-col">
              <h3 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2"><Activity size={12}/> 实时事件日志</h3>
              <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {logs.map(log => (
                  <div key={log.id} className="text-[10px] p-2 bg-slate-50 rounded border border-slate-100 border-l-2 border-l-slate-400">
                    <span className="text-slate-400 mr-2 font-mono">[{log.time}]</span>
                    <span className="text-blue-600 font-bold mr-1">{log.station}</span>
                    <span className="text-slate-600">{log.msg}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderAlertsView = () => (
    <div className="flex-1 bg-slate-50 p-6 flex flex-col overflow-hidden animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div><h2 className="text-xl font-bold text-slate-800">告警事件中心</h2><p className="text-slate-500 text-xs mt-1 font-medium">处理全线设备故障与客流异常工单</p></div>
        <div className="flex gap-2"><button className="flex items-center gap-2 px-3 py-1.5 bg-white rounded border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50"><Filter size={14} /> 筛选</button><button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded text-xs font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-200"><CheckCircle size={14} /> 批量确认</button></div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
         {[
           { label: '待处理告警', val: '2', color: 'text-red-600', icon: AlertTriangle, bg: 'bg-red-50' },
           { label: '处理中', val: '1', color: 'text-amber-500', icon: Clock, bg: 'bg-amber-50' },
           { label: '今日已结案', val: '15', color: 'text-green-600', icon: CheckCircle, bg: 'bg-green-50' },
           { label: '响应时效', val: '2m 15s', color: 'text-blue-600', icon: Activity, bg: 'bg-blue-50' },
         ].map((item, i) => (
           <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
              <div><div className="text-slate-500 text-[10px] font-bold uppercase mb-1">{item.label}</div><div className={`text-xl font-bold ${item.color}`}>{item.val}</div></div>
              <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}><item.icon size={18}/></div>
           </div>
         ))}
      </div>
      <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 gap-4 p-3 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/50">
          <div className="col-span-2">工单编号</div><div className="col-span-1">级别</div><div className="col-span-2">站点/设备</div><div className="col-span-4">详情</div><div className="col-span-1">状态</div><div className="col-span-2 text-right">操作</div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {alerts.map(alert => (
             <div key={alert.id} className="grid grid-cols-12 gap-4 p-4 border-b border-slate-50 items-center hover:bg-slate-50/50 transition-colors">
                <div className="col-span-2 text-slate-500 font-mono text-[11px]">{alert.id}</div>
                <div className="col-span-1">
                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${alert.level === 'critical' ? 'bg-red-50 text-red-600 border-red-100' : alert.level === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{alert.level === 'critical' ? '紧急' : '普通'}</span>
                </div>
                <div className="col-span-2">
                   <div className="text-slate-800 text-xs font-bold">{alert.station}</div>
                   <div className="text-slate-400 text-[10px]">{alert.device}</div>
                </div>
                <div className="col-span-4">
                   <div className="text-slate-700 text-xs font-medium">{alert.type}</div>
                   <div className="text-slate-400 text-[10px] truncate">{alert.desc}</div>
                </div>
                <div className="col-span-1">
                  <span className={`text-[10px] font-bold ${alert.status === 'pending' ? 'text-red-500' : alert.status === 'processing' ? 'text-amber-500' : 'text-green-500'}`}>{alert.status === 'pending' ? '待处理' : '处理中'}</span>
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                   <button className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded font-bold">派单</button>
                   <button className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-1 rounded font-bold">详情</button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStaffView = () => (
    <div className="flex-1 bg-slate-50 p-6 flex flex-col overflow-hidden animate-fade-in">
       <div className="flex justify-between items-center mb-6">
        <div><h2 className="text-xl font-bold text-slate-800">网格化力量调度</h2><p className="text-slate-500 text-xs mt-1 font-medium">实时监控现场执勤人员分布与作业状态</p></div>
        <div className="flex gap-2"><button className="px-3 py-1.5 bg-white rounded border border-slate-300 text-xs font-bold text-slate-600">排班计划</button><button className="px-3 py-1.5 bg-blue-600 rounded text-xs font-bold text-white shadow-md shadow-blue-200">+ 新增指派</button></div>
      </div>
      <div className="flex gap-6 h-full">
         <div className="w-1/3 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <span className="font-bold text-sm text-slate-700">在线执勤组 (10)</span>
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">信号正常</span>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
              {staffList.map(staff => (
                <div key={staff.id} className="bg-white p-3 rounded border border-slate-100 hover:border-blue-400 transition-all shadow-sm">
                   <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                         {staff.role === 'maintenance' && <Wrench size={12} className="text-blue-500"/>}
                         {staff.role === 'security' && <Shield size={12} className="text-red-500"/>}
                         <span className="font-bold text-slate-800 text-xs">{staff.name}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${staff.status === 'busy' || staff.status === 'working' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>{staff.status === 'busy' ? '处理中' : '空闲'}</span>
                   </div>
                   <div className="text-[10px] text-slate-400 flex items-center gap-1 mb-1"><Bus size={10}/> {staff.vehicle}</div>
                   <div className="text-[10px] text-slate-600 flex items-center gap-1"><MapPin size={10} className="text-slate-300"/> {staff.location}</div>
                </div>
              ))}
            </div>
         </div>
         <div className="flex-1 bg-slate-200 rounded-lg border border-slate-300 relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center opacity-40">
               <MapIcon size={120} className="text-slate-300" />
            </div>
            <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
               <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute"></div>
               <div className="w-8 h-8 bg-white rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 shadow-lg relative z-10"><Wrench size={16}/></div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded border border-slate-200 text-[10px] font-bold text-slate-500 space-y-1 shadow-lg">
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> 维修组</div>
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 特勤组</div>
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> 保洁组</div>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden relative">
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-6 h-full">
           <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <Bus className="text-blue-600" size={20}/> BRT 智控中心 (奉贤线)
           </h1>
           <nav className="flex gap-1 h-full pt-2">
             {[
               { id: 'monitor', label: '综合监控', icon: Monitor },
               { id: 'alerts', label: '告警事件', icon: AlertTriangle, badge: 2 },
               { id: 'staff', label: '力量调度', icon: Users },
             ].map(nav => (
               <button 
                 key={nav.id} 
                 onClick={() => setActiveTab(nav.id)}
                 className={`px-4 h-full flex items-center gap-2 text-xs font-bold transition-all border-b-2 relative ${activeTab === nav.id ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
               >
                 <nav.icon size={14}/> {nav.label}
                 {nav.badge && <span className="absolute top-2 right-1 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full border border-white">{nav.badge}</span>}
               </button>
             ))}
           </nav>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-right font-mono font-bold">
              <div className="text-sm text-slate-800 leading-none">{currentTime.toLocaleTimeString('zh-CN', {hour12: false})}</div>
              <div className="text-[10px] text-slate-400">{currentTime.toLocaleDateString('zh-CN')}</div>
           </div>
           {activeTab === 'monitor' && (
             <button onClick={simulateIncident} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold shadow-md shadow-blue-200 animate-pulse">模拟求助</button>
           )}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col">
        {activeTab === 'monitor' && renderMonitorView()}
        {activeTab === 'alerts' && renderAlertsView()}
        {activeTab === 'staff' && renderStaffView()}
      </div>

      {incomingCall && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col ring-4 ring-red-100 animate-fade-in">
              <div className="bg-red-600 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-3"><Phone className="animate-bounce" /><span className="font-bold text-lg">来自 {incomingCall.stationName} 的求助</span></div>
                <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">等待接听</span>
              </div>
              <div className="p-6 grid grid-cols-2 gap-6 bg-slate-50">
                 <div className="aspect-video bg-black rounded border border-slate-300 flex flex-col items-center justify-center relative">
                    <span className="text-5xl">{incomingCall.passengerImg}</span>
                    <p className="text-slate-500 text-xs mt-4 font-bold uppercase tracking-widest">乘客实时画面</p>
                    <div className="absolute top-2 right-2 flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div><span className="text-[10px] text-red-500 font-bold">LIVE</span></div>
                 </div>
                 <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-800 mb-1">原因：{incomingCall.reason}</h3>
                      <p className="text-slate-400 text-[10px] font-bold">设备: Gate-02-Entry | 沈杜公路</p>
                      <div className="bg-white p-3 rounded border border-slate-200 mt-4 shadow-sm">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">AI 预判</p>
                        <p className="text-blue-700 text-xs font-bold leading-relaxed">检测到乘客持非标准票卡，疑似老年乘客，建议通过对讲指引。</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-6">
                      {!isTalking ? (
                        <button onClick={() => setIsTalking(true)} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-100 transition-all active:scale-95"><Mic size={18}/> 接听通话</button>
                      ) : (
                        <div className="flex gap-2">
                           <div className="flex-1 bg-green-50 rounded flex items-center justify-center text-green-600 font-bold border border-green-200 text-xs animate-pulse">通话中...</div>
                           <button onClick={handleEndCall} className="p-3 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"><Phone size={18} className="rotate-[135deg]"/></button>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={handleOpenGate} className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs shadow-md shadow-blue-100 flex items-center justify-center gap-2"><Unlock size={14}/> 远程开闸</button>
                        <button onClick={handleEndCall} className="py-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded font-bold text-xs flex items-center justify-center gap-2"><X size={14}/> 拒绝</button>
                      </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// 辅助组件
function NavItem({ icon, label, active, onClick, badge }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${active ? 'bg-blue-50 text-blue-700 border border-blue-100 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'}`}
    >
      <div className="flex items-center gap-3"><span className="w-5 h-5">{icon}</span><span className="hidden md:block text-sm">{label}</span></div>
      {badge && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">{badge}</span>}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    normal: "bg-green-50 text-green-600 border-green-200",
    warning: "bg-amber-50 text-amber-600 border-amber-200",
    alert: "bg-red-50 text-red-600 border-red-200",
  };
  const labels: any = { normal: "正常", warning: "预警", alert: "故障" };
  return <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${styles[status]}`}>{labels[status]}</span>;
}

function ControlButton({ icon, label, color }: any) {
  return (
    <button className={`flex-1 ${color} text-white p-3 rounded-lg flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-blue-100/20`}>
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

export default BRTUnattendedView;
