
import React, { useState } from 'react';
import { CalendarDays, Sparkles, Clock, CalendarCheck, Settings, CheckCircle, Check } from 'lucide-react';
import { getSmartMaintenancePlan } from '../services/geminiService';
import { AIRecommendation } from '../types';

const InspectionPlanView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'custom'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedAssetType, setSelectedAssetType] = useState('营运车辆');
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);

  const calendarDays = Array.from({length: 30}, (_, i) => {
    const day = i + 1;
    const status = day % 7 === 0 ? 'missed' : day < 20 ? 'completed' : 'pending';
    const taskCount = Math.floor(Math.random() * 5);
    return { day, status, taskCount };
  });

  const handleRecommend = async () => {
    setIsRecommending(true);
    const result = await getSmartMaintenancePlan(selectedAssetType, "夏季预防性维护");
    setRecommendation(result);
    setIsRecommending(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex gap-2 shadow-sm">
        <button
          onClick={() => setActiveTab('list')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <CalendarDays size={18} /> 巡检日历与任务列表
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'custom' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Sparkles size={18} /> 智能计划定制 (AI)
        </button>
      </div>

      {activeTab === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <CalendarCheck className="text-blue-600"/> 2024年5月 巡检概览
                 </h3>
                 <div className="flex gap-4 text-[10px]">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 已完成</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div> 待执行</span>
                 </div>
              </div>
              <div className="grid grid-cols-7 gap-3">
                 {['日','一','二','三','四','五','六'].map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-slate-400 mb-2">{d}</div>
                 ))}
                 {calendarDays.map((d) => (
                    <div 
                      key={d.day}
                      onClick={() => setSelectedDate(d.day)}
                      className={`h-24 rounded-xl border p-2 cursor-pointer transition-all ${selectedDate === d.day ? 'ring-2 ring-blue-500 bg-blue-50/30' : 'bg-white border-slate-100'}`}
                    >
                       <span className="text-xs font-bold text-slate-700">{d.day}</span>
                       <div className={`mt-2 text-[8px] truncate px-1 rounded ${d.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                          {d.taskCount} 项任务
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h4 className="font-bold text-slate-800 text-lg mb-4">5月{selectedDate}日 待办事宜</h4>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="p-3 rounded-lg border border-slate-100 hover:bg-slate-50">
                       <h5 className="font-bold text-slate-700 text-xs mb-1">例行设备检查 #{i}</h5>
                       <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <Clock size={12}/> 09:00 - 11:00
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
               <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                  <Settings size={20} className="text-blue-600"/> 计划参数设置
               </h3>
               <div className="space-y-5">
                  <div>
                     <label className="block text-sm font-bold text-slate-600 mb-2">资产类别</label>
                     <div className="grid grid-cols-3 gap-3">
                        {['营运车辆', 'IT设施', '场站设施'].map(type => (
                           <button
                              key={type}
                              onClick={() => setSelectedAssetType(type)}
                              className={`py-2 rounded-lg text-xs border transition-all ${selectedAssetType === type ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'bg-white border-slate-200 text-slate-500'}`}
                           >
                              {type}
                           </button>
                        ))}
                     </div>
                  </div>
                  <button 
                    onClick={handleRecommend}
                    disabled={isRecommending}
                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    {isRecommending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Sparkles size={18}/> 生成 AI 智能推荐计划</>}
                  </button>
               </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center relative">
               {recommendation ? (
                  <div className="w-full h-full flex flex-col animate-fade-in">
                     <div className="bg-white rounded-xl border border-indigo-100 p-5 mb-4">
                        <h4 className="font-bold text-slate-800 text-lg">{recommendation.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 mb-4">推荐频率: <span className="text-indigo-600 font-bold">{recommendation.frequency}</span></p>
                        <div className="bg-slate-50 p-3 rounded-lg mb-4 text-xs">
                           <p className="font-bold text-slate-500 mb-1">AI 推荐理由</p>
                           <p className="text-slate-700">{recommendation.reason}</p>
                        </div>
                        <div className="space-y-2">
                           {recommendation.items.map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                 <CheckCircle size={14} className="text-emerald-500"/> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                     <button className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                        <Check size={18}/> 确认并发布计划
                     </button>
                  </div>
               ) : (
                  <div className="text-center text-slate-400">
                     <Sparkles size={48} className="mx-auto mb-4 opacity-20"/>
                     <p>点击左侧按钮，由 Gemini AI 生成最佳巡检方案</p>
                  </div>
               )}
            </div>
         </div>
      )}
    </div>
  );
};

export default InspectionPlanView;
