
import React, { useState } from 'react';
import { 
  Coins, Calculator, Stamp, PieChart, BarChart3, Filter, 
  Users, User, Building2, HardDrive, ClipboardList, Package, Zap,
  Plus, RefreshCw, Clock, CheckCircle
} from 'lucide-react';

const CostAccountingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dimension, setDimension] = useState('dept');

  const approvalItems = [
    { id: 'AP-202405-001', type: '额外服务费', amount: 3500, reason: '夜间紧急抢修工时补贴', applicant: '李强', date: '2024-05-20', status: 'pending' },
    { id: 'AP-202405-002', type: '大额备件采购', amount: 12800, reason: '更换进口变频器组件', applicant: '物资部-张伟', date: '2024-05-19', status: 'pending' },
  ];

  const ledgerItems = [
    { id: 'CB-001', date: '2024-05-20', category: '人工服务', sub: '维修工时费', amount: 450, target: 'WO-20240520-001', dept: '客运一部' },
    { id: 'CB-002', date: '2024-05-20', category: '物料消耗', sub: '机油滤芯', amount: 120, target: 'WO-20240520-001', dept: '客运一部' },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-sm">
      <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex gap-2 shadow-sm">
        {[
          { id: 'overview', label: '成本统计与分析', icon: PieChart },
          { id: 'ledger', label: '全成本核算台账', icon: Calculator },
          { id: 'approval', label: '费用审批控制台', icon: Stamp },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
           <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-700 ml-2 flex items-center gap-2 text-xs">
                 <Filter size={16}/> 统计维度:
              </span>
              <div className="flex gap-2">
                 {[
                    { id: 'branch', label: '按分公司', icon: Building2 },
                    { id: 'dept', label: '按部门', icon: Users },
                 ].map(d => (
                    <button key={d.id} onClick={() => setDimension(d.id)} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-2 ${dimension === d.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-50 text-slate-500'}`}>
                       <d.icon size={14}/> {d.label}
                    </button>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                 { label: '本月总成本', value: '¥ 452,800', icon: Coins, color: 'text-blue-600', bg: 'bg-blue-50' },
                 { label: '物料备件消耗', value: '¥ 128,400', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
                 { label: '人工与服务费', value: '¥ 85,200', icon: User, color: 'text-purple-600', bg: 'bg-purple-50' },
                 { label: '能耗与摊销', value: '¥ 239,200', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map((item, idx) => (
                 <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                       <p className="text-slate-500 text-[10px] font-bold mb-1 uppercase">{item.label}</p>
                       <h3 className="text-xl font-bold text-slate-800">{item.value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                       <item.icon size={20}/>
                    </div>
                 </div>
              ))}
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
                 <h3 className="font-bold text-slate-800 mb-6 w-full text-left flex items-center gap-2">
                    <PieChart size={18} className="text-blue-600"/> 成本构成分析
                 </h3>
                 <div className="w-40 h-40 rounded-full border-[12px] border-blue-500 border-l-emerald-500 border-b-amber-500 relative flex items-center justify-center">
                    <div className="text-center">
                       <span className="text-xs text-slate-400">总支出</span>
                       <span className="text-lg font-bold text-slate-800 block">45.2万</span>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <BarChart3 size={18} className="text-blue-600"/> 部门成本对比
                 </h3>
                 <div className="space-y-4">
                    {[
                       { name: '客运一部', val: 15.2 },
                       { name: '维修中心', val: 8.5 },
                       { name: '信息部', val: 5.2 },
                    ].map((d, i) => (
                       <div key={i} className="flex items-center gap-4">
                          <span className="text-xs font-bold text-slate-600 w-20 text-right">{d.name}</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 rounded-full" style={{width: `${(d.val / 20) * 100}%`}}></div>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-700 w-16">{d.val}万</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'ledger' && (
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
               <h3 className="font-bold text-slate-800">全成本核算台账</h3>
               <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold bg-blue-50 text-blue-600 rounded-lg"><Plus size={14}/> 补录</button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold bg-emerald-50 text-emerald-600 rounded-lg"><RefreshCw size={14}/> 计提</button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                     <tr>
                        <th className="p-4">记账日期</th>
                        <th className="p-4">费用类型</th>
                        <th className="p-4">关联对象</th>
                        <th className="p-4 text-right">金额 (¥)</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {ledgerItems.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50">
                           <td className="p-4 font-mono text-slate-500">{row.date}</td>
                           <td className="p-4 font-bold">{row.category}</td>
                           <td className="p-4">{row.target}</td>
                           <td className="p-4 text-right font-mono font-bold text-slate-800">{row.amount.toFixed(2)}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {activeTab === 'approval' && (
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[500px]">
            <div className="flex items-center gap-2 mb-6">
               <Stamp className="text-rose-500"/>
               <h3 className="font-bold text-slate-800 text-lg">费用审批控制台</h3>
            </div>
            <div className="space-y-4">
               {approvalItems.map((item) => (
                  <div key={item.id} className="border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-amber-50 text-amber-600"><Clock size={24}/></div>
                        <div>
                           <h4 className="font-bold text-slate-800">{item.type}</h4>
                           <p className="text-xs text-slate-600">申请人: {item.applicant} • {item.date}</p>
                           <p className="text-[10px] text-slate-400 mt-1">原因: {item.reason}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-xl font-bold text-slate-800 mb-2">¥ {item.amount.toLocaleString()}</p>
                        <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-xs">批准</button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default CostAccountingView;
