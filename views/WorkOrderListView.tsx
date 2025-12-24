
import React, { useState } from 'react';
import { 
  ListTodo, Search, Plus, AlertCircle, Wrench, Package, Box, 
  Siren, Edit3, MoreHorizontal, FileCheck, Archive, Book, X,
  ThumbsUp, Save, Clock, Calculator, CheckCircle
} from 'lucide-react';
import { WorkOrder, Priority } from '../types';

const WorkOrderListView: React.FC = () => {
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);

  const STATUS_CONFIG: Record<string, { label: string, color: string, icon: any }> = {
    pool: { label: '工单池', color: 'bg-slate-100 text-slate-600', icon: Box },
    repairing: { label: '维修中', color: 'bg-indigo-50 text-indigo-600', icon: Wrench },
    waiting_parts: { label: '备件申请中', color: 'bg-amber-50 text-amber-600', icon: Package },
    issue_confirm: { label: '问题待确认', color: 'bg-rose-50 text-rose-600', icon: AlertCircle },
    archived: { label: '归档', color: 'bg-emerald-50 text-emerald-600', icon: Archive },
    knowledge_base: { label: '转入知识库', color: 'bg-purple-50 text-purple-600', icon: Book },
  };

  const workOrders: WorkOrder[] = [
    { 
      id: 'WO-20240520-001', 
      title: '71路-沪A99821 空调压缩机异响', 
      priority: Priority.URGENT, 
      status: 'repairing', 
      assignee: '李维修', 
      progress: 60,
      timeline: '已派单 -> 现场检查完成 -> 维修中',
      created: '2024-05-20 08:30'
    },
    { 
      id: 'WO-20240520-005', 
      title: '站台PIS显示屏黑屏', 
      priority: Priority.HIGH, 
      status: 'pool', 
      assignee: null, 
      progress: 10,
      timeline: '报修接入 -> 等待分配',
      created: '2024-05-20 11:05'
    },
  ];

  const getPriorityBadge = (p: Priority) => {
    switch(p) {
      case Priority.URGENT: return <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold border border-red-200 flex items-center gap-1"><Siren size={10}/> 紧急</span>;
      case Priority.HIGH: return <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold border border-orange-200">高</span>;
      default: return <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200">中</span>;
    }
  };

  const WorkOrderProcessingModal = ({ wo, onClose }: { wo: WorkOrder, onClose: () => void }) => {
    const [step, setStep] = useState('process');
    const [rating, setRating] = useState('average');

    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden text-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-lg">{wo.title}</h3>
                {getPriorityBadge(wo.priority)}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1">{wo.id} | {wo.assignee || '未分配'}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full"><X size={20} className="text-slate-500"/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex mb-6 bg-white p-1 rounded-lg border border-slate-200 shadow-sm w-fit mx-auto">
               {['process', 'parts', 'review'].map(s => (
                 <button 
                   key={s}
                   onClick={() => setStep(s)}
                   className={`px-6 py-2 rounded-md font-bold transition-all ${step === s ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                 >
                   {s === 'process' ? '作业执行' : s === 'parts' ? '备件申请' : '完工核算'}
                 </button>
               ))}
            </div>

            {step === 'process' && (
              <div className="space-y-4 animate-fade-in">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><ListTodo size={18}/> 维修作业检查项</h4>
                    <div className="space-y-3">
                       {['现场安全检查确认', '故障现象复核', '维修操作执行', '通电测试'].map((item, i) => (
                          <label key={i} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                             <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                             <span className="text-slate-700">{item}</span>
                          </label>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {step === 'review' && (
              <div className="space-y-6 animate-fade-in">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                       <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Calculator size={18}/> 成本核算</h4>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                             <span className="text-slate-500 font-bold">作业总成本:</span>
                             <span className="text-xl font-bold text-blue-600">¥ 1,450.00</span>
                          </div>
                       </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                       <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><ThumbsUp size={18}/> 完工评价</h4>
                       <div className="flex gap-2">
                          {['unsatisfied', 'average', 'satisfied'].map(r => (
                             <button key={r} onClick={() => setRating(r)} className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${rating === r ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white text-slate-500'}`}>
                                {r === 'unsatisfied' ? '不满意' : r === 'average' ? '一般' : '满意'}
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
             <button onClick={onClose} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-bold flex items-center gap-2 shadow-md shadow-emerald-200">
                <Save size={16}/> 确认完工并归档
             </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '待处理工单池', value: '12', color: 'text-rose-500', bg: 'bg-rose-50', icon: AlertCircle },
          { label: '维修进行中', value: '8', color: 'text-blue-600', bg: 'bg-blue-50', icon: Wrench },
          { label: '备件等待', value: '3', color: 'text-amber-500', bg: 'bg-amber-50', icon: Package },
          { label: '今日已完成', value: '15', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
             <span className="text-[10px] text-slate-500 font-bold uppercase">{item.label}</span>
             <div className="flex justify-between items-end">
                <h3 className={`text-2xl font-bold ${item.color}`}>{item.value}</h3>
                <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}><item.icon size={18}/></div>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[500px]">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
           <div className="flex items-center gap-4">
              <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2"><ListTodo className="text-blue-600"/> 运维工单总览</h2>
           </div>
           <div className="flex gap-3">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input type="text" placeholder="搜索工单..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none w-64"/>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors">
                 <Plus size={16}/> 创建工单
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
           <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                 <tr>
                    <th className="p-4 w-16">状态</th>
                    <th className="p-4">工单编号 / 内容摘要</th>
                    <th className="p-4">当前进度</th>
                    <th className="p-4">负责人</th>
                    <th className="p-4 text-right">操作</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {workOrders.map((wo) => {
                    const status = STATUS_CONFIG[wo.status] || STATUS_CONFIG['pool'];
                    const StatusIcon = status.icon;
                    return (
                       <tr key={wo.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="p-4">
                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${status.color} border border-current/10`}>
                                <StatusIcon size={16} />
                             </div>
                          </td>
                          <td className="p-4">
                             <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xs text-slate-400">{wo.id}</span>
                                {getPriorityBadge(wo.priority)}
                             </div>
                             <p className="font-bold text-slate-800">{wo.title}</p>
                          </td>
                          <td className="p-4">
                             <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                                <div className="h-full bg-blue-500" style={{width: `${wo.progress}%`}}></div>
                             </div>
                             <p className="text-[10px] text-slate-400 truncate w-32">{wo.timeline}</p>
                          </td>
                          <td className="p-4">
                             {wo.assignee || <span className="text-rose-500 font-bold">待分配</span>}
                          </td>
                          <td className="p-4 text-right">
                             <button onClick={() => setSelectedWorkOrder(wo)} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                                <Edit3 size={16} />
                             </button>
                             <button className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors ml-2">
                                <MoreHorizontal size={16} />
                             </button>
                          </td>
                       </tr>
                    );
                 })}
              </tbody>
           </table>
        </div>
      </div>

      {selectedWorkOrder && (
        <WorkOrderProcessingModal wo={selectedWorkOrder} onClose={() => setSelectedWorkOrder(null)} />
      )}
    </div>
  );
};

export default WorkOrderListView;
