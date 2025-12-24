
import React, { useState, useEffect } from 'react';
import { 
  Activity, Server, Shield, ShieldAlert, Database, 
  Globe, Cpu, Thermometer, Wind, AlertTriangle, 
  LayoutDashboard, Network, Lock, Zap, Box, 
  CheckCircle, XCircle, Search, Cloud, Router
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

// --- Mock Data Generator ---
const generateData = (length = 20) => {
  return Array.from({ length }, (_, i) => ({
    time: `10:${i < 10 ? '0' + i : i}`,
    traffic: Math.floor(Math.random() * 800) + 200,
    cpu: Math.floor(Math.random() * 40) + 20,
    temp: Math.floor(Math.random() * 5) + 20,
  }));
};

const NetworkMonitoringView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(generateData());
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', msg: '总部核心交换机 B 温度略高 (42°C)', time: '10:15' },
    { id: 2, type: 'critical', msg: '外部 IP 192.168.x.x 尝试爆破防火墙', time: '10:12' },
    { id: 3, type: 'success', msg: '数据库异地灾备同步完成', time: '09:00' },
  ]);

  // Sync data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          traffic: Math.floor(Math.random() * 800) + 200,
          cpu: Math.floor(Math.random() * 30) + 30,
          temp: Math.floor(Math.random() * 3) + 21,
        });
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- View Components ---

  const Overview = () => (
    <div className="grid grid-cols-12 gap-6 animate-fade-in">
      <div className="col-span-3 bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">实时网络吞吐</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{data[data.length-1].traffic} <span className="text-sm font-normal text-slate-400">Mbps</span></h3>
          </div>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Activity size={18} /></div>
        </div>
        <div className="mt-4 h-20">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="traffic" stroke="#10b981" fillOpacity={1} fill="url(#colorTraffic)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-3 bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">核心 CPU 负载</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{data[data.length-1].cpu}%</h3>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Cpu size={18} /></div>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-blue-500 transition-all duration-500" style={{width: `${data[data.length-1].cpu}%`}}></div>
        </div>
        <p className="text-[10px] text-slate-400 mt-2">计算资源充足</p>
      </div>

      <div className="col-span-3 bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">机房平均温度</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{data[data.length-1].temp}°C</h3>
          </div>
          <div className="p-2 bg-orange-50 rounded-lg text-orange-500"><Thermometer size={18} /></div>
        </div>
         <div className="mt-4 h-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-3 bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">安全威胁阻断</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">1,204 <span className="text-sm font-normal text-slate-400">次/日</span></h3>
          </div>
          <div className="p-2 bg-rose-50 rounded-lg text-rose-500"><ShieldAlert size={18} /></div>
        </div>
        <div className="flex space-x-2 mt-6">
            <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 text-[10px] rounded font-bold">DDoS: 2</span>
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded font-bold">SQLi: 45</span>
        </div>
      </div>

      <div className="col-span-8 bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Server size={18} className="text-blue-600" /> 核心业务服务器集群负载趋势
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="cpu" stroke="#2563eb" strokeWidth={3} name="CPU 使用率" dot={false} activeDot={{r: 4}} />
              <Line type="monotone" dataKey="traffic" stroke="#10b981" strokeWidth={3} name="网络流量" dot={false} activeDot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-4 bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" /> 实时网络告警
        </h3>
        <div className="space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
            {alerts.map(alert => (
                <div key={alert.id} className={`flex items-start p-3 bg-slate-50 rounded-lg border-l-4 border-l-transparent transition-colors ${
                  alert.type === 'critical' ? 'border-l-rose-500' : alert.type === 'warning' ? 'border-l-amber-500' : 'border-l-emerald-500'
                }`}>
                    <div className="flex-1">
                        <p className="text-[11px] text-slate-700 font-bold leading-tight">{alert.msg}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block font-mono">{alert.time}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );

  const Topology = () => (
    <div className="h-[650px] bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex items-center justify-center animate-fade-in">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
        
        <div className="absolute top-6 left-6 text-slate-500 text-[10px] bg-white/80 backdrop-blur p-3 rounded-xl border border-slate-200 shadow-sm z-10">
            <p className="font-bold text-slate-700 mb-1 text-xs">SD-WAN 多分支广域网</p>
            <p>主连接: 运营商光纤 MSTP</p>
            <p>总部: 500Mbps | 场站: 100Mbps</p>
        </div>

        <div className="relative w-[800px] h-[500px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" strokeWidth="2">
                <path d="M400,250 L400,100" stroke="#cbd5e1" strokeDasharray="6,4" />
                <path d="M400,250 L150,400" stroke="#cbd5e1" strokeDasharray="6,4" />
                <path d="M400,250 L650,400" stroke="#cbd5e1" strokeDasharray="6,4" />
                <path d="M400,250 L400,100" stroke="#3b82f6" strokeWidth="3" className="opacity-20 animate-pulse" />
            </svg>

            {/* ISP Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-40"></div>
                    <div className="bg-white p-5 rounded-full border-2 border-blue-500 shadow-xl relative z-10">
                        <Cloud className="w-10 h-10 text-blue-600" />
                    </div>
                </div>
                <span className="text-xs font-bold text-slate-700 mt-2 px-2 bg-white/80 rounded">运营商核心 / ISP</span>
            </div>

            {/* Sites */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 p-4 bg-slate-50/80 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center gap-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">集团总部 (HQ)</div>
                <div className="flex gap-4">
                  <div className="p-2 bg-white rounded-lg border border-rose-200 shadow-sm"><Shield className="w-6 h-6 text-rose-500" /></div>
                  <div className="p-2 bg-white rounded-lg border border-blue-200 shadow-sm"><Database className="w-6 h-6 text-blue-500" /></div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 p-4 bg-slate-50/80 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center gap-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase">茸惠路研发中心</div>
                <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-sm"><Router className="w-6 h-6 text-emerald-600" /></div>
            </div>

            <div className="absolute bottom-0 right-0 p-4 bg-slate-50/80 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center gap-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase">大学城智能工厂</div>
                <div className="p-2 bg-white rounded-lg border border-amber-200 shadow-sm"><Box className="w-6 h-6 text-amber-500" /></div>
            </div>
        </div>
    </div>
  );

  const Twin = () => {
    const racks = [
        { id: 'HQ-A01', usage: 80, temp: 24, power: 1.2, servers: 7 },
        { id: 'HQ-A02', usage: 45, temp: 22, power: 0.8, servers: 4 },
        { id: 'HQ-B01', usage: 92, temp: 28, power: 2.1, servers: 9, alert: true },
        { id: 'HQ-B02', usage: 30, temp: 21, power: 0.5, servers: 2 },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-end bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-lg text-slate-800 font-bold">机房数字孪生视图 - 总部 A 区</h2>
                    <p className="text-xs text-slate-500 mt-1">PUE: 1.45 | 环境湿度: 45% | 精密空调: 运行正常</p>
                </div>
                <div className="flex space-x-4 text-[10px] font-bold uppercase tracking-wider">
                    <span className="flex items-center text-slate-600"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm mr-2"></span> 正常</span>
                    <span className="flex items-center text-slate-600"><span className="w-2.5 h-2.5 bg-rose-500 rounded-sm mr-2"></span> 告警</span>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-8">
                {racks.map((rack) => (
                    <div key={rack.id} className="relative group cursor-pointer">
                        <div className={`h-[400px] w-full border-2 rounded-xl p-2 flex flex-col gap-1 transition-all duration-300 shadow-lg bg-slate-50 ${
                          rack.alert ? 'border-rose-400 shadow-rose-100' : 'border-slate-200 shadow-slate-100 group-hover:border-blue-300'
                        }`}>
                            <div className="text-center border-b border-slate-200 pb-2 mb-2 font-mono font-bold text-slate-600">{rack.id}</div>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className={`flex-1 w-full rounded border relative overflow-hidden flex items-center px-2 ${i < rack.servers ? 'bg-slate-700 border-slate-800' : 'bg-white border-slate-100'}`}>
                                    {i < rack.servers && (
                                        <div className="flex gap-1 ml-auto">
                                            <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-0 -right-4 translate-x-full opacity-0 group-hover:opacity-100 transition-all z-20 w-40 bg-white border border-slate-200 p-4 rounded-xl shadow-2xl pointer-events-none">
                            <h4 className="text-xs font-bold text-slate-800 mb-2">{rack.id} 状态</h4>
                            <div className="space-y-1.5 text-[10px] text-slate-500 font-bold">
                                <div className="flex justify-between"><span>负载:</span><span className={rack.usage > 90 ? 'text-rose-500' : 'text-emerald-600'}>{rack.usage}%</span></div>
                                <div className="flex justify-between"><span>实时温:</span><span>{rack.temp}°C</span></div>
                                <div className="flex justify-between"><span>功耗:</span><span>{rack.power} kW</span></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  };

  const Security = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-3 gap-6">
            <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl flex items-center gap-5 shadow-sm">
                <div className="p-4 bg-white rounded-full shadow-md text-rose-500 border border-rose-100"><ShieldAlert size={32} /></div>
                <div><h3 className="text-3xl font-extrabold text-rose-700">HIGH</h3><p className="text-rose-600 text-xs font-bold uppercase tracking-widest">当前威胁等级</p></div>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">FW 并发连接 (CPS)</p>
                 <p className="text-3xl font-bold text-slate-800 font-mono">4,520</p>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                 <div><p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">IPS 库版本</p><p className="text-lg font-bold text-emerald-600">v2024.05.20.01</p></div>
                 <CheckCircle className="text-emerald-500" size={24}/>
            </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-slate-800 font-bold flex items-center gap-2"><Lock size={18} className="text-blue-600" /> 实时安全态势日志</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-2 text-slate-400" size={14} />
                    <input type="text" placeholder="搜索源 IP..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
            </div>
            <div className="h-[400px] overflow-auto">
                <table className="w-full text-left text-xs font-medium">
                    <thead className="bg-slate-100 text-slate-500 sticky top-0 font-bold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                            <th className="p-4">时间</th>
                            <th className="p-4">源 IP</th>
                            <th className="p-4">协议</th>
                            <th className="p-4">事件类型</th>
                            <th className="p-4">系统动作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {[1,2,3,4,5,6,7,8,9,10].map((i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-mono text-slate-400">10:24:{20+i}</td>
                                <td className="p-4 font-mono text-blue-600 font-bold">192.168.1.{100+i}</td>
                                <td className="p-4"><span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">HTTPS / 443</span></td>
                                <td className="p-4">{i % 3 === 0 ? <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-bold">SQL 注入尝试</span> : '正常策略匹配'}</td>
                                <td className="p-4">{i % 3 === 0 ? <span className="flex items-center text-rose-600 gap-1 font-bold"><XCircle size={14}/> 阻断</span> : <span className="flex items-center text-emerald-600 gap-1 font-bold"><CheckCircle size={14}/> 放行</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="bg-white p-1 rounded-xl border border-slate-200 inline-flex shadow-sm">
        {[
          { id: 'overview', label: '基础运行总览', icon: LayoutDashboard },
          { id: 'topology', label: '广域网拓扑', icon: Network },
          { id: 'twin', label: '机房数字孪生', icon: Box },
          { id: 'security', label: '安全风险态势', icon: Shield },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Main View Area */}
      <div className="min-h-[600px]">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'topology' && <Topology />}
          {activeTab === 'twin' && <Twin />}
          {activeTab === 'security' && <Security />}
      </div>
    </div>
  );
};

export default NetworkMonitoringView;
