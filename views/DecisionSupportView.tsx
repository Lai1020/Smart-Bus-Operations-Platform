
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Activity, DollarSign, ShieldAlert, Cpu, TrendingUp, Zap, Clock, 
  AlertTriangle, CheckCircle, BarChart2, PieChart, Search, 
  ChevronRight, ArrowRight, Layers, FileText, Calendar, RefreshCw, 
  Filter, ArrowDown, ArrowUp, Lightbulb, Server, TrendingDown, 
  Thermometer, Database, Globe, HardDrive, BookOpen, Sparkles, Loader2,
  Ruler, Scale, Plug, Calculator, Shield
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area, 
  PieChart as RePieChart, Pie, Cell, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart
} from 'recharts';
import { GoogleGenAI } from "@google/genai";

// --- Mock Data ---
const lifecycleData = [
  { year: '2019', acquisition: 120, operation: 10, maintenance: 5, disposal: 0 },
  { year: '2020', acquisition: 0, operation: 25, maintenance: 15, disposal: 0 },
  { year: '2021', acquisition: 0, operation: 28, maintenance: 22, disposal: 0 },
  { year: '2022', acquisition: 30, operation: 30, maintenance: 35, disposal: 0 },
  { year: '2023', acquisition: 0, operation: 32, maintenance: 45, disposal: 0 },
  { year: '2024', acquisition: 0, operation: 35, maintenance: 12, disposal: 5 }, 
  { year: '2025', acquisition: 0, operation: 36, maintenance: 15, disposal: 0 }, 
];

const efficiencyRoiData = [
  { month: '1月', energyCost: 12, depreciation: 25, totalCost: 37, revenue: 45, utilization: 45 },
  { month: '2月', energyCost: 13, depreciation: 25, totalCost: 38, revenue: 42, utilization: 48 },
  { month: '3月', energyCost: 15, depreciation: 25, totalCost: 40, revenue: 58, utilization: 65 },
  { month: '4月', energyCost: 14, depreciation: 25, totalCost: 39, revenue: 62, utilization: 70 },
  { month: '5月', energyCost: 11, depreciation: 25, totalCost: 36, revenue: 38, utilization: 25 },
  { month: '6月', energyCost: 18, depreciation: 25, totalCost: 43, revenue: 75, utilization: 82 },
];

const serverPowerData = [
  { id: 'S-001', name: 'Web-Cluster-01', ratedPower: 800, actualPower: 750, utilization: 88, status: 'Healthy' },
  { id: 'S-002', name: 'Web-Cluster-02', ratedPower: 800, actualPower: 720, utilization: 85, status: 'Healthy' },
  { id: 'S-003', name: 'Dev-Build-Server', ratedPower: 1200, actualPower: 150, utilization: 5, status: 'Idle' },
  { id: 'S-004', name: 'Legacy-DB-Read', ratedPower: 1000, actualPower: 300, utilization: 12, status: 'LowLoad' },
  { id: 'S-005', name: 'AI-Training-Node', ratedPower: 2000, actualPower: 1950, utilization: 98, status: 'Healthy' },
];

const riskData = [
  { subject: '合规性', A: 120, fullMark: 150 },
  { subject: '网络安全', A: 98, fullMark: 150 },
  { subject: '设备老化', A: 86, fullMark: 150 },
  { subject: '单点故障', A: 99, fullMark: 150 },
  { subject: '人员技能', A: 85, fullMark: 150 },
  { subject: '数据备份', A: 65, fullMark: 150 },
];

const riskSources = [
  { id: 'RS-01', name: '核心交易数据库', type: 'Database', kri: '锁等待时长', currentValue: '120ms', threshold: '200ms', status: 'Warning', trend: 'up', icon: Database },
  { id: 'RS-02', name: 'A区核心交换机', type: 'Network', kri: '丢包率', currentValue: '0.01%', threshold: '0.1%', status: 'Healthy', trend: 'flat', icon: Globe },
  { id: 'RS-03', name: '存储阵列-SAN01', type: 'Storage', kri: '磁盘温差', currentValue: '8°C', threshold: '5°C', status: 'Critical', trend: 'up', icon: HardDrive }
];

const historicalCases: Record<string, any[]> = {
  'RS-03': [
    { id: 'CASE-2023-089', title: '某金融机构存储过热导致宕机', similarity: 92, rootCause: '空调局部死角导致磁盘热积累' },
    { id: 'CASE-2022-112', title: '硬盘批次性故障预警', similarity: 78, rootCause: '特定批次固件在高温下读写错误激增' }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// --- Helper Components ---
const Card = ({ title, children, className = "" }: any) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-5 ${className}`}>
    {title && <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">{title}</h3>}
    {children}
  </div>
);

const StatCard = ({ title, value, subtext, icon: Icon, trend }: any) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
      <div className={`flex items-center mt-2 text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-slate-500'}`}>
        {trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : trend === 'down' ? <TrendingUp size={14} className="mr-1 transform rotate-180" /> : null}
        {subtext}
      </div>
    </div>
    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
      <Icon size={24} />
    </div>
  </div>
);

// --- Modules ---

const CostModule = () => {
  const [sortConfig, setSortConfig] = useState<any>({ key: 'indirectLoss', direction: 'desc' });
  const [selectedScenarioId, setSelectedScenarioId] = useState('db-fail');
  const [selectedNode, setSelectedNode] = useState(null);

  const faultScenarios = [
    {
      id: 'db-fail', name: '核心数据库死锁', frequency: 2, repairCost: 50000, indirectLoss: 1200000, severity: 'Critical',
      tree: {
        id: 'root', label: '核心数据库死锁', cost: '¥ 1,250,000', type: 'root',
        children: [
          {
            id: 'direct', label: '直接维修成本', cost: '¥ 50,000', type: 'branch',
            children: [ { id: 'expert', label: '原厂专家工时', cost: '¥ 40,000', type: 'leaf' }, { id: 'tool', label: '应急工具授权', cost: '¥ 10,000', type: 'leaf' } ]
          },
          {
            id: 'indirect', label: '业务间接损失', cost: '¥ 1,200,000', type: 'branch',
            children: [ { id: 'order', label: '订单交易中断', cost: '¥ 950,000', type: 'leaf' }, { id: 'sla', label: 'SLA 违约赔付', cost: '¥ 200,000', type: 'leaf' }, { id: 'pr', label: '品牌公关修复', cost: '¥ 50,000', type: 'leaf' } ]
          }
        ]
      }
    },
    {
      id: 'api-timeout', name: '支付网关超时波动', frequency: 24, repairCost: 2000, indirectLoss: 150000, severity: 'Medium',
      tree: {
        id: 'root', label: '支付网关超时', cost: '¥ 152,000', type: 'root',
        children: [
          { id: 'direct', label: '直接排查成本', cost: '¥ 2,000', type: 'branch', children: [ { id: 'devops', label: '运维人力投入', cost: '¥ 2,000', type: 'leaf' } ] },
          { id: 'indirect', label: '业务流失损失', cost: '¥ 150,000', type: 'branch', children: [ { id: 'abandon', label: '用户放弃支付', cost: '¥ 150,000', type: 'leaf' } ] }
        ]
      }
    }
  ];

  const sortedScenarios = useMemo(() => {
    let sortable = [...faultScenarios];
    if (sortConfig.key) {
      sortable.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [sortConfig]);

  const activeScenario = faultScenarios.find(s => s.id === selectedScenarioId) || faultScenarios[0];

  const handleSort = (key: string) => {
    setSortConfig({ key, direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc' });
  };

  const TreeNode = ({ node, level = 0 }: any) => (
    <div className={`flex flex-col items-center ${level > 0 ? 'mt-8' : ''}`}>
      <div 
        className={`relative cursor-pointer transition-all p-3 rounded-lg border-2 shadow-lg min-w-[140px] text-center ${selectedNode === node.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'} ${node.type === 'root' ? 'border-rose-500' : node.type === 'branch' ? 'border-amber-400' : 'border-slate-300'}`}
        onClick={() => setSelectedNode(node.id)}
      >
        <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{node.type === 'root' ? '根因事件' : node.type === 'branch' ? '分类' : '细项'}</div>
        <div className="font-bold text-slate-800 text-sm">{node.label}</div>
        <div className="text-rose-600 font-mono font-bold mt-1 text-sm">{node.cost}</div>
        {node.children?.length > 0 && <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>}
      </div>
      {node.children?.length > 0 && (
        <div className="flex space-x-6 mt-8 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-[calc(100%-140px)] h-0.5 bg-slate-300"></div>
          {node.children.map((child: any) => (
             <div key={child.id} className="relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-slate-300"></div>
                <TreeNode node={child} level={level + 1} />
             </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="月总运维成本" value="¥ 482,000" subtext="较上月减少 5%" trend="up" icon={DollarSign} />
        <StatCard title="单工单平均成本" value="¥ 320" subtext="效率提升" trend="up" icon={FileText} />
        <StatCard title="故障造成的损失" value="¥ 124,000" subtext="本月突发" trend="down" icon={AlertTriangle} />
        <StatCard title="预算执行率" value="78%" subtext="处于健康范围" trend="up" icon={PieChart} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        <Card title="故障场景排序列表" className="lg:col-span-4 flex flex-col">
          <div className="flex space-x-2 mb-4 text-xs">
            {['frequency', 'repairCost', 'indirectLoss'].map(key => (
              <button key={key} onClick={() => handleSort(key)} className={`flex-1 px-2 py-1.5 rounded flex items-center justify-center space-x-1 transition-colors ${sortConfig.key === key ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-100 text-slate-600'}`}>
                <span>{key === 'frequency' ? '频率' : key === 'repairCost' ? '维修费' : '间接损失'}</span>
                {sortConfig.key === key && (sortConfig.direction === 'desc' ? <ArrowDown size={12}/> : <ArrowUp size={12}/>)}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            {sortedScenarios.map(scenario => (
              <div key={scenario.id} onClick={() => setSelectedScenarioId(scenario.id)} className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedScenarioId === scenario.id ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800 text-sm">{scenario.name}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${scenario.severity === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>{scenario.severity}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div><span className="text-slate-400 block scale-90 origin-left">频率</span><span className="font-mono font-bold">{scenario.frequency}次</span></div>
                  <div><span className="text-slate-400 block scale-90 origin-left">直接成本</span><span className="font-mono font-bold">¥{(scenario.repairCost/1000).toFixed(1)}k</span></div>
                  <div><span className="text-slate-400 block scale-90 origin-left">间接损失</span><span className="font-mono font-bold text-rose-600">¥{(scenario.indirectLoss/10000).toFixed(1)}w</span></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title={`故障成本树: ${activeScenario.name}`} className="lg:col-span-8 overflow-x-auto flex flex-col items-center bg-slate-50/30">
          <div className="p-4 w-full flex justify-center mt-6">
            <TreeNode node={activeScenario.tree} />
          </div>
        </Card>
      </div>
    </div>
  );
};

const EfficiencyModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="综合能效比 (PUE)" value="1.42" subtext="优于行业平均" trend="up" icon={Zap} />
      <StatCard title="资源闲置率" value="12.5%" subtext="发现3台僵尸服务器" trend="down" icon={TrendingDown} />
      <StatCard title="投入产出效能 (ROI)" value="1 : 4.2" subtext="效率提升显著" trend="up" icon={DollarSign} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="投入产出效能分析 (Total Cost vs Value)" className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={efficiencyRoiData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="depreciation" stackId="a" name="设备折旧" fill="#94a3b8" />
            <Bar yAxisId="left" dataKey="energyCost" stackId="a" name="运营能耗" fill="#6366f1" />
            <Line yAxisId="left" type="monotone" dataKey="revenue" name="业务价值" stroke="#10b981" strokeWidth={3} />
            <Line yAxisId="right" type="monotone" dataKey="utilization" name="利用率" stroke="#f59e0b" strokeDasharray="5 5" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>
      <Card title="能耗-闲置率关联分析" className="min-h-[400px]">
         <div className="space-y-4">
           {serverPowerData.map(server => (
             <div key={server.id} className={`p-4 rounded-lg border flex items-center justify-between ${server.utilization < 10 ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-100'}`}>
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-lg ${server.utilization < 10 ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}><Server size={20} /></div>
                   <div>
                      <h4 className="font-bold text-slate-700">{server.name}</h4>
                      <p className="text-xs text-slate-400">ID: {server.id} | 额定: {server.ratedPower}W</p>
                   </div>
                </div>
                <div className="flex gap-8 text-right">
                   <div><p className="text-[10px] text-slate-400 uppercase">功耗</p><p className="font-mono font-bold">{server.actualPower}W</p></div>
                   <div><p className="text-[10px] text-slate-400 uppercase">利用率</p><p className={`font-mono font-bold ${server.utilization < 20 ? 'text-rose-600' : 'text-emerald-600'}`}>{server.utilization}%</p></div>
                </div>
             </div>
           ))}
         </div>
      </Card>
      <Card title="效率洞察报告" className="bg-slate-900 text-white border-none flex flex-col justify-center p-8">
         <div className="flex items-start gap-4">
            <Lightbulb className="text-amber-400 shrink-0 mt-1" />
            <div>
               <h4 className="font-bold text-lg mb-2">发现资源浪费节点</h4>
               <p className="text-slate-400 text-sm leading-relaxed mb-6">系统检测到 Dev-Build-Server 长期处于低负载状态。建议下架或整合至开发集群，预计月度可节省能耗及折旧成本 ¥ 2,400。</p>
               <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold transition-all">发起下架流程</button>
            </div>
         </div>
      </Card>
    </div>
  </div>
);

const AssetsModule = () => {
  const [calc, setCalc] = useState<any>({
    oldOriginalCost: 120000,
    oldUsefulLifeYears: 8,
    oldDailyEnergy: 120,
    oldDailyMaintenance: 280,
    newPurchaseCost: 85000,
    newDailyEnergy: 60,
    newDailyMaintenance: 60,
  });

  const analysis = useMemo(() => {
    const remainingDays = 3 * 365; // 假设剩余3年
    const oldTCO = (calc.oldDailyEnergy + calc.oldDailyMaintenance) * remainingDays;
    const newTCO = calc.newPurchaseCost + (calc.newDailyEnergy + calc.newDailyMaintenance) * remainingDays;
    const savings = oldTCO - newTCO;
    return { savings, isProfitable: savings > 0, remainingDays };
  }, [calc]);

  return (
    <div className="space-y-6">
      <Card title="智能改造损益计算器 (Intelligent Retrofit Calculator)" className="border-blue-200 border-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="font-bold text-slate-700 flex items-center gap-2 border-b border-rose-100 pb-2"><Activity className="text-rose-500" size={18}/> 当前设备现状 (OPEX)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-[10px] font-bold text-slate-400 uppercase">原始成本 (¥)</label><input type="number" value={calc.oldOriginalCost} onChange={e=>setCalc({...calc, oldOriginalCost: +e.target.value})} className="w-full border rounded p-2 text-sm"/></div>
              <div><label className="text-[10px] font-bold text-slate-400 uppercase">日均能耗 (¥/天)</label><input type="number" value={calc.oldDailyEnergy} onChange={e=>setCalc({...calc, oldDailyEnergy: +e.target.value})} className="w-full border rounded p-2 text-sm"/></div>
              <div className="col-span-2"><label className="text-[10px] font-bold text-slate-400 uppercase">日均运维/备件费 (¥/天)</label><input type="number" value={calc.oldDailyMaintenance} onChange={e=>setCalc({...calc, oldDailyMaintenance: +e.target.value})} className="w-full border rounded p-2 text-sm"/></div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-slate-700 flex items-center gap-2 border-b border-emerald-100 pb-2"><Zap className="text-emerald-500" size={18}/> 拟采购设备方案 (CAPEX+OPEX)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-[10px] font-bold text-slate-400 uppercase">拟采购单价 (¥)</label><input type="number" value={calc.newPurchaseCost} onChange={e=>setCalc({...calc, newPurchaseCost: +e.target.value})} className="w-full border rounded p-2 text-sm text-emerald-700 font-bold"/></div>
              <div><label className="text-[10px] font-bold text-slate-400 uppercase">预计能耗 (¥/天)</label><input type="number" value={calc.newDailyEnergy} onChange={e=>setCalc({...calc, newDailyEnergy: +e.target.value})} className="w-full border rounded p-2 text-sm"/></div>
              <div className="col-span-2"><label className="text-[10px] font-bold text-slate-400 uppercase">预计运维费 (¥/天)</label><input type="number" value={calc.newDailyMaintenance} onChange={e=>setCalc({...calc, newDailyMaintenance: +e.target.value})} className="w-full border rounded p-2 text-sm"/></div>
            </div>
          </div>
          <div className={`lg:col-span-2 p-6 rounded-xl text-white flex items-center justify-between ${analysis.isProfitable ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-slate-600'}`}>
             <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full"><TrendingUp size={32}/></div>
                <div><h4 className="font-bold text-lg">改造损益分析</h4><p className="text-sm opacity-80">计算周期: {analysis.remainingDays} 天 (至报废期)</p></div>
             </div>
             <div className="text-right">
                <p className="text-xs uppercase opacity-70">预计节省成本</p>
                <p className="text-3xl font-bold">¥ {analysis.savings.toLocaleString()}</p>
             </div>
             <div className="text-right border-l border-white/20 pl-8">
                <p className="text-xs uppercase opacity-70">决策建议</p>
                <p className="text-xl font-bold">{analysis.isProfitable ? '建议立即改造' : '建议维持现状'}</p>
             </div>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="TCO 全生命周期成本模型" className="lg:col-span-2 h-[400px]">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lifecycleData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="acquisition" stackId="a" fill="#6366f1" name="采购" />
                <Bar dataKey="operation" stackId="a" fill="#10b981" name="能耗" />
                <Bar dataKey="maintenance" stackId="a" fill="#f59e0b" name="维保" />
              </BarChart>
           </ResponsiveContainer>
        </Card>
        <Card title="资产分布概览">
           <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie data={[{ name: '正常运行', value: 850 }, { name: '闲置', value: 120 }, { name: '报废待处理', value: 230 }]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {COLORS.map((color, index) => (<Cell key={`cell-${index}`} fill={color} />))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePieChart>
           </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

const RiskModule = () => {
  const [selectedSourceId, setSelectedSourceId] = useState('RS-03');
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const selectedSource = riskSources.find(s => s.id === selectedSourceId);
  const activeCases = historicalCases[selectedSourceId] || [];

  const handleAIAnalysis = async () => {
    if (!selectedSource) return;
    setIsAiLoading(true);
    setAiReport(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `分析以下风险资产并给出诊断报告：
        资产: ${selectedSource.name} (${selectedSource.type})
        风险指标: ${selectedSource.kri}
        当前值: ${selectedSource.currentValue} (阈值: ${selectedSource.threshold})
        状态: ${selectedSource.status}
        请包含：1.根本原因分析 2.紧急缓解措施 3.长期预防策略。
        使用 Markdown 格式，语言：中文。`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiReport(response.text || "AI 无法生成分析内容。");
    } catch (err) {
      setAiReport("AI 分析服务暂时不可用，请稍后重试。");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="运维风险全景雷达" className="min-h-[400px]">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={riskData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 150]} />
              <Radar name="风险值" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="关键风险源实时监控 (KRI)" className="lg:col-span-2">
           <div className="space-y-3">
             {riskSources.map(source => (
               <div key={source.id} onClick={() => setSelectedSourceId(source.id)} className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${selectedSourceId === source.id ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
                 <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${source.status === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}><source.icon size={20} /></div>
                    <div><h4 className="font-bold text-slate-800">{source.name}</h4><p className="text-xs text-slate-500">指标: {source.kri} | {source.currentValue}</p></div>
                 </div>
                 <ChevronRight className={selectedSourceId === source.id ? 'text-blue-600' : 'text-slate-300'} />
               </div>
             ))}
           </div>
        </Card>
      </div>

      {selectedSource && (
        <div className="space-y-6 animate-fade-in">
          <Card className="border-blue-200 border-2 bg-gradient-to-br from-white to-blue-50/30">
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-100"><Sparkles size={24} /></div>
                 <div><h3 className="text-lg font-bold">AI 智能风险诊断专家</h3><p className="text-sm text-slate-500">基于 Gemini Pro 模型的实时深度分析</p></div>
               </div>
               <button onClick={handleAIAnalysis} disabled={isAiLoading} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all disabled:opacity-50">
                 {isAiLoading ? <Loader2 className="animate-spin" size={18}/> : <Sparkles size={18} />}
                 {isAiLoading ? '分析中...' : '生成诊断报告'}
               </button>
             </div>
             {aiReport ? (
               <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm leading-relaxed whitespace-pre-wrap text-sm text-slate-700">{aiReport}</div>
             ) : (
               <div className="text-center py-12 bg-white/50 rounded-xl border border-dashed border-blue-200 text-slate-400">点击按钮，AI 将深度剖析风险根因</div>
             )}
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="历史案例知识库匹配 (CBR)">
              <div className="space-y-3">
                {activeCases.map(c => (
                  <div key={c.id} className="p-3 border rounded-lg bg-slate-50 border-slate-200">
                    <div className="flex justify-between font-bold text-sm text-slate-700 mb-1"><span>{c.title}</span><span className="text-emerald-600">{c.similarity}% 相似</span></div>
                    <p className="text-xs text-slate-500">{c.rootCause}</p>
                  </div>
                ))}
                {activeCases.length === 0 && <p className="text-center text-slate-400 text-sm py-8">暂无匹配案例</p>}
              </div>
            </Card>
            <Card title="蝴蝶结模型推演 (Bow-Tie Analysis)">
               <div className="flex flex-col items-center justify-center py-8">
                  <div className="flex items-center gap-4 w-full justify-center">
                     <div className="text-right text-xs text-slate-500">威胁: {selectedSource.kri} 异常</div>
                     <ArrowRight size={16} className="text-slate-300" />
                     <div className="px-4 py-2 bg-rose-100 text-rose-600 text-xs font-bold rounded-lg border border-rose-200">关键风险事件</div>
                     <ArrowRight size={16} className="text-slate-300" />
                     <div className="text-left text-xs text-slate-500">后果: 业务运行中断</div>
                  </div>
               </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

const DecisionSupportView = () => {
  const [activeTab, setActiveTab] = useState('risk');

  const tabs = [
    { id: 'cost', label: '成本中心', icon: DollarSign, color: 'text-indigo-500' },
    { id: 'efficiency', label: '效率中心', icon: Zap, color: 'text-amber-500' },
    { id: 'assets', label: '资产中心', icon: Layers, color: 'text-emerald-500' },
    { id: 'risk', label: '风险中心', icon: ShieldAlert, color: 'text-rose-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-1 rounded-xl border border-slate-200 inline-flex shadow-sm">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : tab.color} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'cost' && <CostModule />}
        {activeTab === 'efficiency' && <EfficiencyModule />}
        {activeTab === 'assets' && <AssetsModule />}
        {activeTab === 'risk' && <RiskModule />}
      </div>
    </div>
  );
};

export default DecisionSupportView;
