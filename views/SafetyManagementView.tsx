
import React from 'react';
import { 
  Shield, Bus, Users, AlertTriangle, Map, BarChart2, Video, 
  Activity, FileText, CheckCircle, Radio, Zap, Navigation, 
  Clock, UserCheck, AlertOctagon, X, FireExtinguisher, HardHat, 
  Truck, Thermometer, Clipboard, Siren, Warehouse, Fuel, Wrench, Flame
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// --- Mock Data ---

const SAFETY_KPI = [
  { title: "百万公里事故率", value: "0.02", unit: "次", change: "-12%", status: "good" },
  { title: "有责投诉率", value: "0.5", unit: "%", change: "-5%", status: "good" },
  { title: "交通违法率", value: "1.2", unit: "%", change: "+0.1%", status: "warning" },
  { title: "设备完好率", value: "99.8", unit: "%", change: "0%", status: "good" },
];

const DAILY_SNAPSHOT = [
  { label: "已发班次", value: "4,285", icon: Bus, color: "text-blue-600" },
  { label: "在线车辆", value: "3,102", icon: Radio, color: "text-green-600" },
  { label: "主动安全报警", value: "128", icon: Shield, color: "text-amber-600" },
  { label: "运营异常", value: "12", icon: AlertTriangle, color: "text-red-600" },
];

const DRIVER_RISK_DATA = [
  { name: '张伟', id: 'D8821', line: '102路', score: 65, level: '高风险', reason: '频繁急刹/疲劳', status: 'training' },
  { name: '李强', id: 'D9902', line: 'BRT-1', score: 72, level: '中风险', reason: '车距过近', status: 'active' },
  { name: '王芳', id: 'D7712', line: 'K11路', score: 78, level: '中风险', reason: '分神驾驶', status: 'active' },
  { name: '赵杰', id: 'D3321', line: '15路', score: 95, level: '低风险', reason: '-', status: 'active' },
  { name: '孙旭', id: 'D1102', line: '88路', score: 58, level: '高风险', reason: '多次超速', status: 'stopped' },
];

const ALARM_FEED = [
  { id: 1, time: "10:23:12", line: "102路", bus: "粤A·88291", type: "前向碰撞预警", level: "high", handled: false },
  { id: 2, time: "10:23:05", line: "BRT-1", bus: "粤A·33120", type: "驾驶员抽烟", level: "medium", handled: false },
  { id: 3, time: "10:22:45", line: "55路", bus: "粤A·77212", type: "车道偏离", level: "low", handled: true },
  { id: 4, time: "10:21:30", line: "旅游3线", bus: "粤A·99102", type: "闭眼检测(疲劳)", level: "high", handled: true },
];

const CHART_DATA_TREND = [
  { time: '06:00', 报警数: 12, 在线车: 500 },
  { time: '08:00', 报警数: 85, 在线车: 2800 },
  { time: '10:00', 报警数: 45, 在线车: 2400 },
  { time: '12:00', 报警数: 30, 在线车: 2200 },
  { time: '14:00', 报警数: 35, 在线车: 2300 },
  { time: '16:00', 报警数: 40, 在线车: 2600 },
  { time: '18:00', 报警数: 90, 在线车: 3100 },
];

const RISK_DISTRIBUTION = [
  { name: '疲劳驾驶', value: 400 },
  { name: '分神', value: 300 },
  { name: '车距过近', value: 300 },
  { name: '接打电话', value: 200 },
];

const STATION_CHECK_DATA = [
  { category: '人员安全', score: 98, full: 100 },
  { category: '消防设施', score: 95, full: 100 },
  { category: '电气安全', score: 100, full: 100 },
  { category: '车辆停放', score: 88, full: 100 },
  { category: '卫生环境', score: 92, full: 100 },
  { category: '应急物资', score: 96, full: 100 },
];

const EMERGENCY_SUPPLIES = [
  { item: "干粉灭火器", stock: 120, status: "normal", expiry: "2024-12" },
  { item: "防汛沙袋", stock: 50, status: "low", expiry: "长期" },
  { item: "急救箱", stock: 15, status: "normal", expiry: "2024-06" },
  { item: "除雪铲", stock: 20, status: "normal", expiry: "长期" },
];

const STATION_ALERTS = [
  { id: 1, type: "车辆超速", location: "天河站-入口通道", time: "10:15", status: "pending" },
  { id: 2, type: "违规堆放", location: "白云站-消防通道", time: "09:30", status: "handled" },
  { id: 3, type: "人员闯入", location: "充电区-电子围栏", time: "08:45", status: "handled" },
];

const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

// --- Sub-Components ---

const KPICard = ({ data }: any) => (
  <div className="bg-white p-4 rounded-lg border border-slate-200 hover:border-blue-400 transition-colors shadow-sm">
    <div className="text-slate-500 text-sm mb-1">{data.title}</div>
    <div className="flex items-end justify-between">
      <div className="text-2xl font-bold text-slate-800">
        {data.value} <span className="text-sm font-normal text-slate-400">{data.unit}</span>
      </div>
      <div className={`text-xs px-2 py-1 rounded font-medium ${
        data.status === 'good' ? 'bg-green-100 text-green-700' : 
        data.status === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
      }`}>
        {data.change}
      </div>
    </div>
  </div>
);

const RiskBadge = ({ level }: { level: string }) => {
  const colors: any = {
    '高风险': 'bg-red-100 text-red-700 border-red-200',
    '中风险': 'bg-orange-100 text-orange-700 border-orange-200',
    '低风险': 'bg-blue-100 text-blue-700 border-blue-200',
  };
  return (
    <span className={`px-2 py-1 rounded border text-xs font-medium ${colors[level] || 'text-slate-500'}`}>
      {level}
    </span>
  );
};

// --- Main View Components ---

export const SafetyCockpit = () => (
  <div className="grid grid-cols-12 gap-6 h-full overflow-y-auto pr-2 custom-scrollbar animate-fade-in">
    {/* Left Column: Stats & Trends */}
    <div className="col-span-12 lg:col-span-3 flex flex-col space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {SAFETY_KPI.map((kpi, idx) => <KPICard key={idx} data={kpi} />)}
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-1 min-h-[280px]">
        <h3 className="text-slate-800 font-semibold mb-4 flex items-center">
          <Activity size={18} className="mr-2 text-blue-600" /> 报警趋势 (24h)
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={CHART_DATA_TREND}>
            <defs>
              <linearGradient id="colorAlarm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" tick={{fontSize: 10}} />
            <YAxis stroke="#64748b" tick={{fontSize: 10}} />
            <Tooltip 
              contentStyle={{backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
            />
            <Area type="monotone" dataKey="报警数" stroke="#ef4444" fillOpacity={0.2} fill="url(#colorAlarm)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-slate-800 font-semibold mb-4">报警类型分布</h3>
        <div className="flex h-40">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={RISK_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={5}
                dataKey="value"
              >
                {RISK_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#1e293b'}} />
              <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{fontSize: '10px', color: '#475569'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Center Column: Map & Snapshot */}
    <div className="col-span-12 lg:col-span-6 flex flex-col space-y-6">
      <div className="grid grid-cols-4 gap-4 bg-white/90 p-4 rounded-lg border border-slate-200 shadow-sm backdrop-blur-sm">
        {DAILY_SNAPSHOT.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center border-r border-slate-100 last:border-0">
            <div className="flex items-center space-x-2 text-slate-500 text-[10px] mb-1">
              <item.icon size={12} />
              <span>{item.label}</span>
            </div>
            <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-slate-100 rounded-lg border border-slate-200 relative overflow-hidden group shadow-inner min-h-[400px]">
        <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.2
        }}></div>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-slate-200 p-3 rounded-lg shadow-sm text-xs text-slate-600 z-10">
          <div className="flex items-center mb-1"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> 正常行驶: 2840</div>
          <div className="flex items-center mb-1"><div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div> 缓慢/拥堵: 240</div>
          <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div> 报警/异常: 22</div>
        </div>

        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse border border-white"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_#ef4444] animate-bounce border border-white"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.6)] border border-white"></div>

        <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 rounded-full text-xs text-blue-600 border border-blue-100 shadow-sm flex items-center cursor-pointer hover:bg-blue-50">
          <Map size={14} className="mr-2" /> 风险热力图已开启
        </div>
      </div>
    </div>

    {/* Right Column: Real-time Alerts */}
    <div className="col-span-12 lg:col-span-3 flex flex-col h-full bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="text-slate-800 font-semibold flex items-center">
          <Radio size={18} className="mr-2 text-red-500 animate-pulse" /> 实时报警
        </h3>
        <span className="text-[10px] text-slate-500">今日 128 条</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {ALARM_FEED.map((alarm) => (
          <div key={alarm.id} className={`p-3 rounded border-l-4 ${
            alarm.level === 'high' ? 'bg-red-50 border-red-500' : 
            alarm.level === 'medium' ? 'bg-orange-50 border-orange-500' : 'bg-blue-50 border-blue-500'
          } cursor-pointer hover:bg-slate-50 transition-colors group relative border-t border-r border-b border-slate-100`}>
             <div className="flex justify-between items-start mb-1">
               <span className="font-bold text-slate-800 text-xs">{alarm.line} | {alarm.bus}</span>
               <span className="text-[10px] text-slate-400">{alarm.time}</span>
             </div>
             <div className={`text-xs font-medium ${
                alarm.level === 'high' ? 'text-red-600' : 
                alarm.level === 'medium' ? 'text-orange-600' : 'text-blue-600'
             }`}>
               {alarm.type}
             </div>
             <div className="flex justify-between items-center mt-2">
                <span className={`text-[10px] px-2 py-0.5 rounded ${alarm.handled ? 'bg-slate-100 text-slate-500' : 'bg-red-600 text-white animate-pulse'}`}>
                  {alarm.handled ? '已处置' : '待处理'}
                </span>
                <button className="text-[10px] text-blue-600 hover:underline flex items-center opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  <Video size={12} className="mr-1" /> 视频
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const SafetyPrevention = () => (
  <div className="grid grid-cols-12 gap-6 h-full animate-fade-in overflow-y-auto pr-2 custom-scrollbar">
    {/* Driver Risk Profile */}
    <div className="col-span-12 lg:col-span-8 bg-white rounded-lg border border-slate-200 flex flex-col shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="text-slate-800 font-semibold flex items-center">
          <UserCheck size={18} className="mr-2 text-blue-600" /> 驾驶员风险画像管理
        </h3>
        <div className="flex space-x-2">
          <input type="text" placeholder="工号" className="bg-white border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500" />
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs">查询</button>
        </div>
      </div>
      <div className="p-4 overflow-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-500 border-b border-slate-200 bg-slate-50">
              <th className="p-3">姓名/工号</th>
              <th className="p-3">所属线路</th>
              <th className="p-3">风险评分</th>
              <th className="p-3">风险等级</th>
              <th className="p-3">状态</th>
              <th className="p-3">操作</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {DRIVER_RISK_DATA.map((driver, idx) => (
              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-3 font-medium">{driver.name} ({driver.id})</td>
                <td className="p-3">{driver.line}</td>
                <td className="p-3">
                  <div className="flex items-center">
                    <span className={`font-bold mr-2 w-6 ${driver.score < 60 ? 'text-red-600' : driver.score < 80 ? 'text-orange-600' : 'text-green-600'}`}>{driver.score}</span>
                    <div className="flex-1 max-w-[100px] h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${driver.score < 60 ? 'bg-red-500' : driver.score < 80 ? 'bg-orange-500' : 'bg-green-500'}`} style={{width: `${driver.score}%`}}></div>
                    </div>
                  </div>
                </td>
                <td className="p-3"><RiskBadge level={driver.level} /></td>
                <td className="p-3">
                   {driver.status === 'training' ? <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded">待培训</span> : 
                    driver.status === 'stopped' ? <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded">停驶</span> : 
                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">正常</span>}
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:underline">详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Sidebar Preventions */}
    <div className="col-span-12 lg:col-span-4 flex flex-col space-y-6">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
         <h3 className="text-slate-800 font-semibold mb-4 flex items-center">
          <Bus size={18} className="mr-2 text-green-600" /> 车辆健康预警
        </h3>
        <div className="space-y-4">
          {[
            { id: "粤A·33821", msg: "胎压异常 (左前轮)", level: "amber" },
            { id: "粤A·99120", msg: "制动片磨损严重", level: "red" },
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center justify-between p-3 rounded border-l-4 ${item.level === 'red' ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'}`}>
               <div className="text-xs">
                 <div className="font-bold">{item.id}</div>
                 <div className="text-slate-500">{item.msg}</div>
               </div>
               <button className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded">处理</button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-slate-800 font-semibold mb-2 flex items-center">
          <Zap size={18} className="mr-2 text-amber-500" /> 线路风险预测
        </h3>
        <div className="bg-indigo-50 p-3 rounded border border-indigo-100">
          <div className="flex justify-between items-center mb-1 text-xs font-bold text-indigo-700">
            <span>102路</span>
            <span className="bg-white px-2 py-0.5 rounded">暴雨预警</span>
          </div>
          <p className="text-[10px] text-indigo-600/80">预计 17:00-19:00 低洼路段积水风险高。</p>
        </div>
      </div>
    </div>
  </div>
);

export const SafetyMonitoring = () => (
  <div className="grid grid-cols-12 gap-6 h-full animate-fade-in">
    <div className="col-span-12 lg:col-span-9 bg-white rounded-lg border border-slate-200 p-2 flex flex-col shadow-sm">
       <div className="flex justify-between items-center mb-2 px-2 text-xs font-medium">
         <div className="text-slate-600 flex items-center">
           <Video size={16} className="mr-2 text-slate-400" /> 重点监控车辆
         </div>
       </div>
       <div className="grid grid-cols-3 grid-rows-3 gap-1 flex-1 bg-slate-100 p-1 rounded">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="relative bg-slate-900 border border-slate-800 group overflow-hidden rounded-sm flex items-center justify-center">
              <Bus size={32} className="text-slate-700 opacity-20" />
              <div className="absolute top-2 left-2 bg-black/60 px-1 text-[8px] text-green-400 font-mono rounded">REC ●</div>
              <div className="absolute bottom-2 left-2 text-[8px] text-white bg-black/50 px-1 rounded">
                 粤A·{88000 + i}
              </div>
              {i === 1 && (
                <div className="absolute inset-0 border-4 border-red-500 animate-pulse bg-red-900/10 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-2 py-1 text-[10px] font-bold">疲劳驾驶</span>
                </div>
              )}
            </div>
          ))}
       </div>
    </div>

    <div className="col-span-12 lg:col-span-3 flex flex-col space-y-4">
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-sm">
        <h3 className="text-red-700 font-bold mb-2 flex items-center text-sm">
          <AlertOctagon size={18} className="mr-2" /> 紧急干预
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded border border-red-100 text-xs shadow-sm">
            <div className="flex justify-between text-slate-800 mb-2 font-bold">
              <span>粤A·88291</span>
              <span className="text-red-600">二级疲劳</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-blue-50 text-blue-700 border border-blue-200 py-2 rounded">语音喊话</button>
              <button className="bg-slate-50 text-slate-700 border border-slate-200 py-2 rounded">下发文字</button>
              <button className="col-span-2 bg-red-600 text-white py-2 rounded font-bold">下发停车指令</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-lg flex-1 shadow-sm text-xs">
         <h3 className="text-slate-800 font-semibold mb-2">场站状态</h3>
         <div className="space-y-2">
           <div className="flex justify-between py-2 border-b border-slate-100">
             <span>天河客运站场</span>
             <span className="text-green-600 font-medium">正常</span>
           </div>
           <div className="flex justify-between py-2 border-b border-slate-100">
             <span>黄埔充电站</span>
             <span className="text-amber-600 font-medium">拥堵</span>
           </div>
         </div>
      </div>
    </div>
  </div>
);

export const StationSafety = () => (
  <div className="grid grid-cols-12 gap-6 h-full overflow-y-auto pr-2 custom-scrollbar animate-fade-in">
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { title: "人员安全", score: 98, icon: Users, color: "text-blue-600" },
        { title: "车辆安全", score: 96, icon: Wrench, color: "text-cyan-600" },
        { title: "作业安全", score: 100, icon: Fuel, color: "text-orange-600" },
        { title: "应急物资", score: 100, icon: Siren, color: "text-red-600" },
      ].map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-xs mb-1">{item.title}</div>
            <div className="text-2xl font-bold text-slate-800">{item.score}<span className="text-[10px] text-slate-400 ml-1">分</span></div>
          </div>
          <div className={`p-3 rounded-full bg-slate-50 ${item.color}`}><item.icon size={20} /></div>
        </div>
      ))}
    </div>

    <div className="col-span-12 lg:col-span-8 flex flex-col space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
        <h3 className="font-bold text-slate-800 flex items-center mb-6">
          <Warehouse className="mr-2 text-blue-600" /> 场站安全巡检雷达
        </h3>
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={STATION_CHECK_DATA}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" tick={{fontSize: 10, fill: '#64748b'}} />
              <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-slate-800 font-semibold mb-4 flex items-center border-b border-slate-100 pb-2">
          <Truck size={18} className="mr-2 text-green-600" /> 场站进出异常
        </h3>
        <div className="space-y-2 text-xs">
          {STATION_ALERTS.map(alert => (
            <div key={alert.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
              <span className="text-slate-600">{alert.location}</span>
              <span className={`px-2 py-0.5 rounded ${alert.status === 'handled' ? 'bg-slate-100 text-slate-500' : 'bg-red-50 text-red-600'}`}>
                 {alert.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="col-span-12 lg:col-span-4 flex flex-col space-y-6">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-1">
        <h3 className="text-slate-800 font-semibold mb-4 flex items-center border-b border-slate-100 pb-2">
          <Siren size={18} className="mr-2 text-red-600" /> 应急物资储备
        </h3>
        <table className="w-full text-left text-xs">
          <thead className="text-slate-400 font-medium">
            <tr className="border-b border-slate-100">
              <th className="pb-2">名称</th>
              <th className="pb-2">库存</th>
              <th className="pb-2">状态</th>
            </tr>
          </thead>
          <tbody>
            {EMERGENCY_SUPPLIES.map((item, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0">
                <td className="py-2 text-slate-700">{item.item}</td>
                <td className="py-2 font-mono font-bold">{item.stock}</td>
                <td className="py-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${item.status === 'low' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {item.status === 'low' ? '不足' : '充足'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-800 rounded-lg p-2 h-40 relative group overflow-hidden border border-slate-700 flex items-center justify-center text-slate-600 text-xs">
         <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">场站实时监控</div>
         [视频预览: 天河总站]
      </div>
    </div>
  </div>
);
