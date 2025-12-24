
import React from 'react';
import { ChevronLeft, Truck, Activity, Zap, MapPin, Clock, User } from 'lucide-react';

interface AssetProfileViewProps {
  assetId: string;
  onBack: () => void;
}

const AssetProfileView: React.FC<AssetProfileViewProps> = ({ assetId, onBack }) => (
  <div className="space-y-6 animate-fade-in">
    {/* Header with Back Button */}
    <div className="flex items-center justify-between">
       <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors group">
          <div className="p-1 rounded-full group-hover:bg-blue-50 transition-colors"><ChevronLeft size={20} /></div>
          <span className="font-bold text-lg">返回资产列表</span>
       </button>
       <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg shadow-sm text-sm font-medium hover:bg-slate-50 transition-colors">导出档案PDF</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700 transition-colors">编辑信息</button>
       </div>
    </div>

    {/* Main Profile Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       {/* Left Col: Identity & Image */}
       <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
             {/* Status Badge */}
             <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-xs font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 运营中
             </div>
             <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-4 flex items-center justify-center text-slate-400 border-4 border-white shadow-md">
                   <Truck size={56} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">纯电动客车 (12m)</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono">{assetId}</span>
                  <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded font-bold">自编号: 88291</span>
                </div>
                
                <div className="mt-8 w-full bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-y-4 gap-x-2 text-left text-sm border border-slate-100">
                   <div>
                      <p className="text-slate-400 text-xs mb-0.5">品牌/型号</p>
                      <p className="font-bold text-slate-700">宇通 / ZK6120</p>
                   </div>
                   <div>
                      <p className="text-slate-400 text-xs mb-0.5">所属部门</p>
                      <p className="font-bold text-slate-700">客运一部</p>
                   </div>
                   <div>
                      <p className="text-slate-400 text-xs mb-0.5">启用日期</p>
                      <p className="font-bold text-slate-700">2023-01-15</p>
                   </div>
                   <div>
                      <p className="text-slate-400 text-xs mb-0.5">保修截止</p>
                      <p className="font-bold text-slate-700">2028-01-14</p>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Health Score Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity size={18} className="text-blue-600"/> 资产健康指数 (AHI)
             </h3>
             <div className="flex items-center justify-center relative h-32 mb-2">
                 <div className="text-center z-10">
                    <span className="text-5xl font-bold text-blue-600 tracking-tighter">92</span>
                    <span className="text-sm text-slate-400 block font-medium">分 / 100</span>
                 </div>
                 {/* Decorative Circle Ring */}
                 <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <circle cx="50%" cy="50%" r="48" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                    <circle cx="50%" cy="50%" r="48" stroke="#2563eb" strokeWidth="8" fill="none" strokeDasharray="301" strokeDashoffset="24" strokeLinecap="round" />
                 </svg>
             </div>
             <div className="text-center">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-bold mb-2">状态优良</span>
                <p className="text-xs text-slate-500 px-4">根据最近一次巡检，电池组电压一致性良好，无故障码。</p>
             </div>
          </div>
       </div>

       {/* Middle Col: 360 View & Real-time Data */}
       <div className="lg:col-span-2 space-y-6">
          {/* The "Holographic" Tabs */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
             <div className="border-b border-slate-100 flex overflow-x-auto bg-slate-50/50">
                {['全息概览', '维修履历', '零部件BOM', 'TCO成本', '物联网数据'].map((tab, i) => (
                   <button key={i} className={`px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${i===0 ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
                      {tab}
                   </button>
                ))}
             </div>
             
             <div className="p-6 flex-1 bg-white">
                {/* Content for "Overview" */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm group hover:border-blue-200 transition-colors">
                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center justify-between">
                         <span className="flex items-center gap-2"><Zap size={16} className="text-amber-500 fill-amber-500"/> 实时动力电池</span>
                         <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded font-bold">充电中</span>
                      </h4>
                      <div className="flex justify-between items-end mb-2">
                         <span className="text-3xl font-bold text-slate-800">88<span className="text-sm text-slate-400 ml-1">%</span></span>
                         <span className="text-xs text-slate-500">剩余续航: <span className="text-slate-800 font-bold">210 km</span></span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-4">
                         <div className="bg-gradient-to-r from-amber-400 to-amber-500 w-[88%] h-full rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]"></div>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-100">
                         <div className="flex justify-between"><span>总电压</span> <span className="font-mono font-bold text-slate-700">580V</span></div>
                         <div className="flex justify-between"><span>电流</span> <span className="font-mono font-bold text-slate-700">120A</span></div>
                         <div className="flex justify-between"><span>最高温度</span> <span className="font-mono font-bold text-slate-700">32°C</span></div>
                         <div className="flex justify-between"><span>SOH</span> <span className="font-mono font-bold text-emerald-600">98%</span></div>
                      </div>
                   </div>
                   
                   <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm group hover:border-blue-200 transition-colors">
                      <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center justify-between">
                         <span className="flex items-center gap-2"><MapPin size={16} className="text-blue-500 fill-blue-500"/> 实时位置与里程</span>
                         <span className="text-[10px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded font-bold">GPS: 强</span>
                      </h4>
                      <div className="h-28 bg-white rounded-lg mb-4 relative overflow-hidden border border-slate-200 shadow-inner">
                          {/* Fake Map */}
                          <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '12px 12px'}}></div>
                          {/* Route Line */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                              <path d="M 20 80 Q 80 20 180 60 T 300 50" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-x-4 -translate-y-2 text-blue-600 drop-shadow-md animate-bounce"><MapPin size={28} fill="currentColor" /></div>
                          <div className="absolute bottom-1 right-1 text-[10px] bg-white/80 px-1 rounded text-slate-400">Map Data © 2024</div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-600 px-1">
                         <span>今日里程: <strong className="text-lg text-slate-800">128</strong> km</span>
                         <span>总里程: <strong className="text-lg text-slate-800">45.2k</strong> km</span>
                      </div>
                   </div>
                </div>

                {/* Timeline Section */}
                <div>
                    <h4 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Clock size={18} className="text-slate-400"/> 近期全生命周期大事记
                    </h4>
                    <div className="space-y-0 pl-3">
                    {[
                        { date: '2023-10-15', title: '季度例行保养 (一级)', type: 'maintenance', desc: '更换齿轮油，检查制动系统，清洁空调滤网。', operator: '李强' },
                        { date: '2023-09-02', title: '车辆保险续期', type: 'admin', desc: '平安保险 (保单号: 2023-PA-882)，保费 ¥12,500', operator: '系统自动' },
                        { date: '2023-06-20', title: '一般故障维修', type: 'repair', desc: '空调压缩机异响处理，更换轴承。', operator: '王建国' },
                        { date: '2023-01-15', title: '新车入库与交付', type: 'start', desc: '完成验车，安装车载终端，交付客运一部。', operator: '张主管' },
                    ].map((event, idx) => (
                        <div key={idx} className="flex gap-6 relative group">
                            {/* Vertical Line */}
                            {idx !== 3 && <div className="absolute left-[11px] top-8 bottom-[-20px] w-0.5 bg-slate-200 group-hover:bg-blue-200 transition-colors"></div>}
                            
                            {/* Icon/Dot */}
                            <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 flex items-center justify-center z-10 mt-1 transition-transform group-hover:scale-110 ${
                                event.type === 'maintenance' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-50' : 
                                event.type === 'repair' ? 'bg-red-100 text-red-600 ring-2 ring-red-50' : 
                                event.type === 'start' ? 'bg-emerald-100 text-emerald-600 ring-2 ring-emerald-50' :
                                'bg-slate-100 text-slate-500 ring-2 ring-slate-50'
                            }`}>
                                <div className={`w-2 h-2 rounded-full bg-current`}></div>
                            </div>
                            
                            {/* Content Card */}
                            <div className="pb-6 flex-1">
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className={`text-xs px-2 py-0.5 rounded font-bold mr-2 ${
                                                event.type === 'maintenance' ? 'bg-blue-50 text-blue-600' :
                                                event.type === 'repair' ? 'bg-red-50 text-red-600' :
                                                'bg-slate-100 text-slate-500'
                                            }`}>{event.type === 'maintenance' ? '维保' : event.type === 'repair' ? '维修' : event.type === 'start' ? '里程碑' : '行政'}</span>
                                            <span className="font-bold text-slate-700 text-sm">{event.title}</span>
                                        </div>
                                        <span className="text-xs text-slate-400 font-mono">{event.date}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">{event.desc}</p>
                                    <div className="mt-2 pt-2 border-t border-slate-50 flex items-center gap-1 text-[10px] text-slate-400">
                                        <User size={10} /> 操作人: {event.operator}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
);

export default AssetProfileView;
