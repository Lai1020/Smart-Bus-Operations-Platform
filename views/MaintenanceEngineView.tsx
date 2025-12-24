
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { 
  Activity, AlertTriangle, Calendar, Wrench, Database, 
  CheckCircle, Clock, Save, TrendingDown, Layers, Box, 
  FileText, ClipboardList, Zap, Cpu, Search, MoreHorizontal
} from 'lucide-react';

// --- Shared Components & Utils ---
const Card = ({ title, children, className = "" }: any) => (
  <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}>
    <h3 className="text-slate-700 font-bold mb-5 flex items-center gap-2 text-lg tracking-tight">
      {title}
    </h3>
    {children}
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    high: 'bg-red-50 text-red-600 border border-red-100',
    medium: 'bg-amber-50 text-amber-600 border border-amber-100',
    low: 'bg-blue-50 text-blue-600 border border-blue-100',
    completed: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    pending: 'bg-slate-100 text-slate-600 border border-slate-200',
    shortage: 'bg-rose-50 text-rose-600 border border-rose-100',
    sufficient: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    busy: 'bg-orange-50 text-orange-600 border border-orange-100',
    available: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  };
  const labels: any = {
    high: '高优先级', shortage: '库存告急', sufficient: '充足', busy: '忙碌', available: '空闲'
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  );
};

// --- Sub-Views ---

export const MaintenanceDashboard = () => {
  const rulData = Array.from({ length: 30 }, (_, i) => ({
    cycle: i + 1,
    health: 100 - (i * 1.5) - (Math.random() * 2),
    predicted: i > 20 ? 100 - (i * 2.5) : null,
    lowerBound: i > 20 ? 100 - (i * 3.0) : null,
    upperBound: i > 20 ? 100 - (i * 2.0) : null,
  }));

  const faultData = [
    { name: '正常运行', value: 15, color: '#10B981' },
    { name: '内圈磨损', value: 65, color: '#EF4444' },
    { name: '外圈磨损', value: 12, color: '#F59E0B' },
    { name: '保持架损坏', value: 8, color: '#6366F1' },
  ];

  const thresholdData = Array.from({ length: 50 }, (_, i) => {
    const load = Math.sin(i / 5) * 20 + 50;
    const baseLimit = load * 1.2;
    return {
      time: `10:${i < 10 ? '0' + i : i}`,
      signal: load + (Math.random() * 5 - 2.5) + (i > 40 ? 15 : 0),
      dynamicLimit: baseLimit,
      staticLimit: 85,
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6 animate-fade-in">
      <Card title={<><TrendingDown className="w-5 h-5 text-blue-600" /> 剩余寿命预测模型 (RUL)</>} className="lg:col-span-2">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rulData}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="cycle" tick={{fill: '#94A3B8', fontSize: 10}} tickLine={false} axisLine={{stroke: '#E2E8F0'}} />
                <YAxis tick={{fill: '#94A3B8', fontSize: 10}} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="health" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" name="历史健康度" />
                <Line type="monotone" dataKey="predicted" stroke="#9333EA" strokeDasharray="4 4" strokeWidth={3} name="AI预测趋势" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="md:w-64 flex flex-col justify-center gap-4 bg-slate-50/50 p-6 rounded-xl border border-slate-100">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">监控对象</p>
              <p className="text-lg font-bold text-slate-800 flex items-center gap-2"><Box className="w-4 h-4" /> 71路-主电机</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">预计剩余寿命</p>
              <p className="text-3xl font-extrabold text-blue-600">142 h</p>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1 font-bold text-slate-500 uppercase">置信度: 92%</div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title={<><Activity className="w-5 h-5 text-rose-500" /> 智能故障分类 (CNN)</>}>
        <div className="h-64 flex items-center">
          <ResponsiveContainer width="50%" height="100%">
            <PieChart>
              <Pie data={faultData} innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                {faultData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="w-1/2 space-y-3">
            {faultData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
            <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg text-[10px] text-rose-600">
               <div className="font-bold flex items-center gap-1 mb-1"><AlertTriangle size={12}/> AI 诊断建议</div>
               检测到严重内圈磨损特征，建议停机。
            </div>
          </div>
        </div>
      </Card>

      <Card title={<><Layers className="w-5 h-5 text-amber-500" /> 动态报警阈值 (Adaptive)</>}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={thresholdData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[40, 100]} tick={{fontSize: 10}} hide />
              <Tooltip />
              <Line type="monotone" dataKey="signal" stroke="#3B82F6" dot={false} name="实时信号" />
              <Line type="step" dataKey="dynamicLimit" stroke="#F59E0B" dot={false} name="动态阈值" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-[10px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-100 flex justify-between font-bold">
           <span>自适应状态: 运行中</span>
           <span>当前动态阈值: 76.4</span>
        </div>
      </Card>
    </div>
  );
};

export const MaintenanceScheduling = () => {
  const [schedule, setSchedule] = useState([
    { id: 'S1', tech: '王强 (高)', task: '71路-主轴更换', start: 9, duration: 4, type: 'emergency' },
    { id: 'S2', tech: '李明 (中)', task: '充电桩巡检', start: 10, duration: 2, type: 'routine' },
    { id: 'S4', tech: '王强 (高)', task: '液压泵调试', start: 14, duration: 2, type: 'routine' },
  ]);
  const [optimizing, setOptimizing] = useState(false);
  const hours = Array.from({ length: 11 }, (_, i) => i + 8);

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setSchedule(prev => [
        ...prev.filter(s => s.id !== 'S4'),
        { id: 'S4', tech: '李明 (中)', task: '液压泵调试 (AI 调配)', start: 13, duration: 2, type: 'routine' }
      ]);
      setOptimizing(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col space-y-6 pb-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">智能调度与资源优化</h2>
          <p className="text-xs text-slate-500 mt-1">实时人员排班与冲突检测系统</p>
        </div>
        <button 
          onClick={handleOptimize}
          disabled={optimizing}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 font-bold text-sm shadow-md flex items-center gap-2"
        >
          {optimizing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Zap size={16}/> 一键优化排程</>}
        </button>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase">
           <div className="flex gap-4">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded"></div> 紧急维修</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded"></div> 例行保养</span>
           </div>
           <span>2024-05-20 (今日)</span>
        </div>
        <div className="flex-1 overflow-auto p-6">
           <div className="min-w-[800px]">
              <div className="flex border-b border-slate-100 mb-4 pb-2">
                <div className="w-48 text-xs font-bold text-slate-400">班组/技术员</div>
                <div className="flex-1 grid grid-cols-11">
                   {hours.map(h => <div key={h} className="text-center text-[10px] font-mono text-slate-400">{h}:00</div>)}
                </div>
              </div>
              {['王强 (高)', '李明 (中)', '赵磊 (外)'].map(tech => (
                <div key={tech} className="flex h-16 border-b border-slate-50 relative items-center">
                   <div className="w-48 font-bold text-slate-700 text-xs">{tech}</div>
                   <div className="flex-1 relative h-10">
                      {schedule.filter(s => s.tech === tech).map(task => {
                        const offset = (task.start - 8) * (100 / 11);
                        const width = task.duration * (100 / 11);
                        return (
                          <div key={task.id} className={`absolute h-full rounded-lg border text-[10px] p-2 flex items-center font-bold ${task.type === 'emergency' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`} style={{ left: `${offset}%`, width: `${width}%` }}>
                             {task.task}
                          </div>
                        )
                      })}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export const MaintenanceInspections = () => {
  const tasks = [
    { id: 1, asset: '71路主电机', task: '振动频谱分析', date: '2024-05-25', status: 'pending', priority: 'high' },
    { id: 2, asset: '变电站 A1', task: '红外测温', date: '2024-05-26', status: 'completed', priority: 'medium' },
    { id: 3, asset: '站台闸机 #02', task: '传动部位润滑', date: '2024-05-27', status: 'pending', priority: 'low' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">预防性巡检计划</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">生成下月计划</button>
       </div>
       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                <tr>
                   <th className="p-4">关联设备</th>
                   <th className="p-4">巡检内容</th>
                   <th className="p-4">截止日期</th>
                   <th className="p-4">优先级</th>
                   <th className="p-4 text-right">操作</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-50">
                {tasks.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50">
                     <td className="p-4 font-bold text-slate-700">{t.asset}</td>
                     <td className="p-4 text-slate-500">{t.task}</td>
                     <td className="p-4 text-slate-500 font-mono text-xs">{t.date}</td>
                     <td className="p-4"><StatusBadge status={t.priority} /></td>
                     <td className="p-4 text-right">
                        <button className="text-blue-600 font-bold hover:underline">详情</button>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

export const MaintenanceSpares = () => {
  const spares = [
    { id: 'BRG-6204', name: '深沟球轴承 6204', stock: 12, required: 5, status: 'sufficient', pred: '预计30天后激增' },
    { id: 'SENS-VIB', name: '振动传感器', stock: 1, required: 2, status: 'shortage', pred: '71路故障率上升' },
    { id: 'LUB-OIL', name: '合成润滑油', stock: 50, required: 0, status: 'sufficient', pred: '正常消耗' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">智能备件管理</h2>
          <div className="relative">
             <Search className="absolute left-3 top-2 text-slate-400" size={14}/>
             <input type="text" className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs" placeholder="搜索备件..."/>
          </div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spares.map(p => (
            <Card key={p.id} className="group">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Box size={20}/></div>
                  <StatusBadge status={p.status} />
               </div>
               <h4 className="font-bold text-slate-800">{p.name}</h4>
               <p className="text-[10px] font-mono text-slate-400 mb-4">{p.id}</p>
               <div className="grid grid-cols-2 gap-2 mb-4 text-[10px] text-slate-500">
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">库存: <span className="font-bold text-slate-800">{p.stock}</span></div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">建议采: <span className="font-bold text-indigo-600">{p.required}</span></div>
               </div>
               <div className="p-2 bg-indigo-50 text-[10px] text-indigo-600 rounded border border-indigo-100 flex items-center gap-2">
                  <Cpu size={12}/> AI 预测: {p.pred}
               </div>
            </Card>
          ))}
       </div>
    </div>
  );
};

export const MaintenanceKnowledge = () => {
  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">维修知识图谱与经验库</h2>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-emerald-200 shadow-md">
             <Save size={16}/> 录入新案例
          </button>
       </div>
       <div className="flex-1 flex gap-6 min-h-[500px]">
          <div className="w-1/3 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
             {[
               { id: 1, title: '主轴高温报警排查SOP', author: '张工', usage: 142 },
               { id: 2, title: '变频器更换指南', author: '李工', usage: 89 },
               { id: 3, title: '液压声纹故障库', author: 'AI自动', usage: 56 },
             ].map(item => (
               <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm cursor-pointer hover:border-blue-500 transition-all">
                  <h4 className="font-bold text-slate-700 text-sm mb-2">{item.title}</h4>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                     <span>贡献: {item.author}</span>
                     <span>调用: {item.usage}</span>
                  </div>
               </div>
             ))}
          </div>
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col">
             <div className="border-b border-slate-100 pb-5 mb-6">
                <div className="flex gap-2 mb-3">
                   <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded">高频故障</span>
                   <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">电机类</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">主轴高温报警排查 SOP</h3>
             </div>
             <div className="flex-1 space-y-8 overflow-y-auto pr-4 custom-scrollbar">
                <section>
                   <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 border-l-4 border-blue-500 pl-3">1. 故障现象</h4>
                   <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
                      71路加工中心在高速运转持续30分钟后，系统报 <span className="text-red-500 font-mono font-bold">Overheat</span> 错误。
                   </div>
                </section>
                <section>
                   <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3 border-l-4 border-indigo-500 pl-3">2. 排查步骤</h4>
                   <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-center gap-2 bg-white border border-slate-100 p-2 rounded">
                        <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
                        检查冷却油箱液位。
                      </li>
                      <li className="flex items-center gap-2 bg-white border border-slate-100 p-2 rounded">
                        <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold">2</div>
                        检查冷却泵过滤器（历史故障率 <span className="text-amber-600 font-bold">60%</span>）。
                      </li>
                   </ul>
                </section>
             </div>
          </div>
       </div>
    </div>
  );
};
