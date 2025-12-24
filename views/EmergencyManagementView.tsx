
import React, { useState } from 'react';
import { 
  Siren, Eye, Flame, Users2, Thermometer, Truck, Shield, MapPin, 
  Clock, Video, CheckCircle, TrendingUp, Activity, AlertTriangle, 
  Map, ListTodo, Package, Signal, Users, Battery, Radio, 
  Link as LinkIcon, RadioTower, Cable, Stethoscope, Umbrella, 
  Users as UsersIcon, Car, Book, Network, Zap, Check
} from 'lucide-react';

// --- 1. Emergency Risk View ---
export const EmergencyRiskView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
             <Eye className="text-red-500"/> 危险源智能识别监控
          </h2>
          <div className="flex gap-3">
             <div className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                高风险源: 2
             </div>
             <div className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm font-bold border border-orange-100">
                中风险源: 5
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
             { id: 'R-001', type: '行为识别', title: '驾驶员疲劳/分神', loc: '71路-沪A99821', time: '10:42:05', level: '高', img: 'bg-slate-800', icon: UsersIcon },
             { id: 'R-002', type: '环境监测', title: '配电房烟雾预警', loc: '申昆路停车场-B区', time: '10:41:30', level: '高', img: 'bg-slate-700', icon: Flame },
             { id: 'R-003', type: '客流分析', title: '站台客流超载', loc: '外滩终点站', time: '10:35:12', level: '中', img: 'bg-slate-600', icon: Users2 },
             { id: 'R-004', type: '设备诊断', title: '制动系统温度异常', loc: '48路-沪B22109', time: '10:20:00', level: '中', img: 'bg-slate-800', icon: Thermometer },
             { id: 'R-005', type: '违规行为', title: '未佩戴安全带', loc: '911路-沪A77651', time: '09:15:45', level: '低', img: 'bg-slate-700', icon: Shield },
             { id: 'R-006', type: '车辆状态', title: '胎压过低告警', loc: '123路-沪C33211', time: '08:50:22', level: '低', img: 'bg-slate-600', icon: Truck },
          ].map((risk, i) => (
             <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className={`h-40 ${risk.img} relative flex items-center justify-center`}>
                   <div className="text-white/20"><Video size={48}/></div>
                   <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded">
                      AI 置信度: 98%
                   </div>
                   <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold text-white ${
                      risk.level === '高' ? 'bg-red-500 animate-pulse' : risk.level === '中' ? 'bg-orange-500' : 'bg-blue-500'
                   }`}>
                      {risk.level}风险
                   </div>
                </div>
                <div className="p-4">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{risk.type}</span>
                         <h4 className="font-bold text-slate-800">{risk.title}</h4>
                      </div>
                      <risk.icon className="text-slate-300" size={20}/>
                   </div>
                   <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><MapPin size={12}/> {risk.loc}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {risk.time}</span>
                   </div>
                   <div className="flex gap-2">
                      <button className="flex-1 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">查看回放</button>
                      <button className="flex-1 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100 text-xs font-bold hover:bg-red-100">生成工单</button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

// --- 2. Emergency Plan View ---
export const EmergencyPlanView = () => {
   const [selectedPlan, setSelectedPlan] = useState('typhoon');

   const plans: any = {
      typhoon: {
         title: '台风灾害应急预案',
         icon: Umbrella,
         color: 'bg-blue-500',
         levels: [
            { level: 'IV级 (蓝色)', condition: '发布台风蓝色预警', action: '启动24小时值班，检查排水设施，加固场站广告牌。' },
            { level: 'III级 (黄色)', condition: '发布台风黄色预警', action: '暂停沿海线路，抢险队集结待命，物资装车。' },
            { level: 'II级 (橙色)', condition: '发布台风橙色预警', action: '全线停运评估，转移低洼车辆，切断非必要电源。' },
            { level: 'I级 (红色)', condition: '发布台风红色预警', action: '全员避险，启动最高级别响应，配合政府救援。' }
         ],
         linkage: ['气象局', '交通委', '防汛办', '供电局']
      },
      crowd: {
         title: '突发大客流应急预案',
         icon: Users,
         color: 'bg-orange-500',
         levels: [
            { level: 'III级', condition: '站台滞留人数 > 50人', action: '缩短发车间隔，增派现场引导员。' },
            { level: 'II级', condition: '站台滞留人数 > 100人', action: '启动备用车辆，实施区间车调度，请求交警疏导。' },
            { level: 'I级', condition: '严重拥挤/踩踏风险', action: '封站限流，公交接驳分流，启动跨线支援。' }
         ],
         linkage: ['轨道交通', '辖区派出所', '周边商圈物业']
      },
      breakdown: {
         title: '车辆抛锚/事故应急预案',
         icon: Car,
         color: 'bg-red-500',
         levels: [
            { level: '一般', condition: '单车故障，不影响交通', action: '司机报修，乘客换乘，维修车进场。' },
            { level: '重大', condition: '造成人员伤亡或交通瘫痪', action: '启动医疗救援，交警现场勘查，公司领导到场。' }
         ],
         linkage: ['120急救', '交警支队', '保险公司', '拖车公司']
      }
   };

   const currentPlan = plans[selectedPlan];

   return (
      <div className="space-y-6 animate-fade-in">
         <div className="grid grid-cols-3 gap-4">
            {Object.entries(plans).map(([key, plan]: any) => (
               <button 
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-4 text-left ${
                     selectedPlan === key 
                     ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-[1.02]' 
                     : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
               >
                  <div className={`p-3 rounded-lg ${selectedPlan === key ? 'bg-white/20' : plan.color + ' bg-opacity-10 text-current'}`}>
                     <plan.icon size={24} className={selectedPlan === key ? 'text-white' : ''} />
                  </div>
                  <div>
                     <h3 className="font-bold text-lg">{plan.title}</h3>
                     <p className="text-xs text-slate-400">点击查看详情与流程</p>
                  </div>
               </button>
            ))}
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
               <div>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                     <Book className="text-blue-600"/> {currentPlan.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">预案版本: V2.0 (2024修订版)</p>
               </div>
               <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">导出PDF</button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow-sm shadow-red-200 flex items-center gap-2">
                     <Siren size={16}/> 模拟演练
                  </button>
               </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-6">
                  <h4 className="font-bold text-slate-700 border-l-4 border-blue-500 pl-3">分级响应机制</h4>
                  <div className="space-y-4">
                     {currentPlan.levels.map((lvl: any, i: number) => (
                        <div key={i} className="flex gap-4">
                           <div className="w-24 shrink-0 pt-1">
                              <span className={`inline-block px-3 py-1 rounded text-xs font-bold text-white ${
                                 lvl.level.includes('I级') || lvl.level.includes('重大') ? 'bg-red-500' :
                                 lvl.level.includes('II级') ? 'bg-orange-500' :
                                 lvl.level.includes('III级') ? 'bg-yellow-500' :
                                 'bg-blue-500'
                              }`}>
                                 {lvl.level}
                              </span>
                           </div>
                           <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-3">
                              <p className="text-xs font-bold text-slate-500 mb-1">触发条件: {lvl.condition}</p>
                              <p className="text-sm text-slate-700">{lvl.action}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div>
                  <h4 className="font-bold text-slate-700 border-l-4 border-emerald-500 pl-3 mb-6">应急部门联动图谱</h4>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center relative min-h-[300px]">
                     <div className="w-24 h-24 bg-blue-600 rounded-full flex flex-col items-center justify-center text-white shadow-lg z-10 relative">
                        <Siren size={24}/>
                        <span className="text-xs font-bold mt-1">指挥中心</span>
                     </div>
                     
                     <div className="absolute inset-0">
                        {currentPlan.linkage.map((dept: string, i: number) => {
                           const angle = (i * (360 / currentPlan.linkage.length)) * (Math.PI / 180);
                           const style = {
                              top: `${50 + 35 * Math.sin(angle)}%`,
                              left: `${50 + 35 * Math.cos(angle)}%`,
                           };
                           return (
                              <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={style}>
                                 <div className="w-10 h-10 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-600 shadow-sm z-10">
                                    <Network size={18}/>
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-600 mt-1 bg-white/80 px-1 rounded">{dept}</span>
                              </div>
                           )
                        })}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                           {currentPlan.linkage.map((_: any, i: number) => {
                              const angle = (i * (360 / currentPlan.linkage.length)) * (Math.PI / 180);
                              return (
                                 <line 
                                    key={i}
                                    x1="50%" y1="50%" 
                                    x2={`${50 + 35 * Math.cos(angle)}%`} 
                                    y2={`${50 + 35 * Math.sin(angle)}%`} 
                                    stroke="#cbd5e1" 
                                    strokeWidth="2" 
                                    strokeDasharray="4"
                                 />
                              )
                           })}
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- 3. Emergency Resources View ---
export const EmergencyResourcesView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg shadow-blue-200">
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-blue-100 text-xs font-bold uppercase">应急救援队伍</p>
                   <h3 className="text-3xl font-bold mt-1">12 <span className="text-sm font-normal text-blue-200">支</span></h3>
                </div>
                <div className="p-2 bg-white/20 rounded-lg"><Users size={20}/></div>
             </div>
             <p className="text-xs text-blue-100 mt-4 flex items-center gap-1"><CheckCircle size={12}/> 全员待命状态</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg shadow-emerald-200">
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-emerald-100 text-xs font-bold uppercase">物资储备充足率</p>
                   <h3 className="text-3xl font-bold mt-1">98.5 <span className="text-sm font-normal text-emerald-200">%</span></h3>
                </div>
                <div className="p-2 bg-white/20 rounded-lg"><Package size={20}/></div>
             </div>
             <p className="text-xs text-emerald-100 mt-4 flex items-center gap-1"><TrendingUp size={12}/> 较上月增加 5%</p>
          </div>
           <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white shadow-lg shadow-amber-200">
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-amber-100 text-xs font-bold uppercase">车辆/通讯保障</p>
                   <h3 className="text-3xl font-bold mt-1">100 <span className="text-sm font-normal text-amber-200">%</span></h3>
                </div>
                <div className="p-2 bg-white/20 rounded-lg"><Truck size={20}/></div>
             </div>
             <p className="text-xs text-amber-100 mt-4 flex items-center gap-1"><Signal size={12}/> 车队/链路正常</p>
          </div>
           <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-indigo-200">
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-indigo-100 text-xs font-bold uppercase">联动部门响应</p>
                   <h3 className="text-3xl font-bold mt-1">3 <span className="text-sm font-normal text-indigo-200">类</span></h3>
                </div>
                <div className="p-2 bg-white/20 rounded-lg"><LinkIcon size={20}/></div>
             </div>
             <p className="text-xs text-indigo-100 mt-4 flex items-center gap-1"><Activity size={12}/> 消防/医疗/交警在线</p>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                   <h3 className="font-bold text-slate-800 flex items-center gap-2"><Video className="text-blue-600" size={18}/> 现场人员配置与实时回传</h3>
                   <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100 flex items-center gap-1"><Radio size={12} className="animate-pulse"/> 信号同步中</span>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                    {[
                        { name: '单兵-01 (队长)', device: '4G执法仪', bat: '85%', status: 'Live', icon: UsersIcon },
                        { name: '单兵-03 (医疗)', device: '4G执法仪', bat: '72%', status: 'Live', icon: UsersIcon },
                        { name: '无人机-Alpha', device: 'DJI Matrice', bat: '62%', status: 'Live', icon: Radio },
                        { name: '无人机-Bravo', device: 'DJI Mavic', bat: '45%', status: 'Return', icon: Radio },
                    ].map((unit, i) => (
                       <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                          <div className={`p-2 rounded-full ${unit.status === 'Live' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                             <unit.icon size={16}/>
                          </div>
                          <div className="flex-1">
                             <div className="flex justify-between">
                                <span className="text-xs font-bold text-slate-700">{unit.name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${unit.status === 'Live' ? 'bg-red-50 text-red-600' : 'bg-slate-200 text-slate-500'}`}>{unit.status}</span>
                             </div>
                             <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                <span>{unit.device}</span>
                                <span className="flex items-center gap-0.5"><Battery size={10}/> {unit.bat}</span>
                             </div>
                          </div>
                       </div>
                    ))}
                    <div className="col-span-2 bg-slate-900 rounded-lg h-48 relative overflow-hidden flex items-center justify-center border border-slate-800">
                        <div className="text-slate-600 flex flex-col items-center">
                            <Video size={40} />
                            <span className="text-xs mt-2">无人机高空侦察画面接入中...</span>
                        </div>
                        <div className="absolute top-2 left-2 flex gap-2">
                             <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold animate-pulse">REC</span>
                             <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">GPS: 31.23, 121.47</span>
                        </div>
                    </div>
                </div>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><Package className="text-amber-600" size={18}/> 应急物资与材料供应</h3>
                 <div className="space-y-4">
                    {[
                       { name: '防汛专用沙袋', total: 5000, current: 4850, unit: '个', color: 'bg-emerald-500' },
                       { name: '除冰工业盐', total: 200, current: 150, unit: '吨', color: 'bg-blue-500' },
                       { name: '应急医疗急救包', total: 500, current: 420, unit: '套', color: 'bg-red-500' },
                    ].map((item, i) => (
                       <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                             <span className="font-bold text-slate-700">{item.name}</span>
                             <span className="text-slate-500">{item.current} / {item.total} {item.unit}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                             <div className={`h-full rounded-full ${item.color}`} style={{width: `${(item.current / item.total) * 100}%`}}></div>
                          </div>
                       </div>
                    ))}
                 </div>
             </div>
          </div>

          <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><Truck className="text-blue-600" size={18}/> 应急车辆保障</h3>
                  <div className="space-y-3">
                     {[
                        { name: '工程抢修车', total: 8, avail: 5, status: '备勤中', color: 'bg-blue-500' },
                        { name: '重型拖车', total: 3, avail: 2, status: '1辆出勤', color: 'bg-amber-500' },
                        { name: '应急驳运大巴', total: 20, avail: 20, status: '全员待命', color: 'bg-emerald-500' },
                     ].map((v, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                           <div className="flex items-center gap-3">
                              <div className={`w-2 h-8 rounded-full ${v.color}`}></div>
                              <div>
                                 <h4 className="text-sm font-bold text-slate-700">{v.name}</h4>
                                 <p className="text-[10px] text-slate-400">可用: {v.avail} / {v.total}</p>
                              </div>
                           </div>
                           <span className={`text-[10px] px-2 py-1 rounded font-bold ${
                              v.avail < v.total ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                           }`}>
                              {v.status}
                           </span>
                        </div>
                     ))}
                  </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4"><LinkIcon className="text-indigo-600" size={18}/> 应急部门联勤联动</h3>
                  <div className="grid grid-cols-1 gap-3">
                     {[
                        { name: '市消防指挥中心 (119)', status: '已连接', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
                        { name: '急救中心调度 (120)', status: '已连接', icon: Stethoscope, color: 'text-red-500', bg: 'bg-red-50' },
                        { name: '公安交警支队 (122)', status: '在线', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50' },
                     ].map((dept, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:shadow-sm">
                           <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${dept.bg} ${dept.color}`}>
                                 <dept.icon size={20}/>
                              </div>
                              <h4 className="text-sm font-bold text-slate-700">{dept.name}</h4>
                           </div>
                           <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                              {dept.status}
                           </span>
                        </div>
                     ))}
                  </div>
              </div>
          </div>
       </div>
    </div>
  )
}

// --- 4. Emergency Command Dashboard View ---
export const EmergencyCommandView = () => {
   const incidents = [
      { id: 'EM-20240520-01', title: '71路车辆轻微擦碰', level: 'IV级', loc: '延安西路江苏路路口', status: 'active', time: '10:45' },
      { id: 'EM-20240519-03', title: '暴雨积水预警', level: 'III级', loc: '全线低洼路段', status: 'standby', time: '16:00' },
   ];

   return (
    <div className="space-y-6 animate-fade-in bg-slate-900 -m-6 p-6 min-h-screen text-slate-100">
       <div className="flex justify-between items-end border-b border-slate-700 pb-4 mb-2">
          <div>
             <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <Siren className="text-red-500 animate-pulse" size={32}/> 
                <span>应急指挥调度中心</span>
                <span className="text-xs font-normal text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-600 uppercase">
                   ECC
                </span>
             </h2>
             <p className="text-slate-400 text-sm mt-1 ml-11">实时监控 • 快速响应 • 统筹调度 • 数据决策</p>
          </div>
          <div className="flex gap-8 items-center">
             <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">安全运行天数</p>
                <p className="text-3xl font-mono font-bold text-emerald-400">1,208 <span className="text-sm text-slate-500">天</span></p>
             </div>
             <div className="h-10 w-px bg-slate-700"></div>
             <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">当前响应等级</p>
                <p className="text-3xl font-bold text-blue-400">IV级</p>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">
          <div className="col-span-3 flex flex-col gap-4">
             <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-bold text-blue-300 mb-4 flex items-center gap-2"><Activity size={16}/> 实时运行监测</h3>
                <div className="space-y-6">
                   <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1"><span>在线车辆</span><span>98.2%</span></div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden"><div className="w-[98.2%] h-full bg-emerald-500"></div></div>
                   </div>
                   <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1"><span>准点率</span><span>94.5%</span></div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden"><div className="w-[94.5%] h-full bg-blue-500"></div></div>
                   </div>
                </div>
             </div>
             <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl h-1/3 flex flex-col">
                <h3 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2"><AlertTriangle size={16}/> 今日预警概况</h3>
                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                   {[
                      { type: '超速告警', count: 12 },
                      { type: '胎压异常', count: 5 },
                      { type: '疲劳驾驶', count: 2 },
                   ].map((w, i) => (
                      <div key={i} className="flex justify-between items-center bg-slate-700/50 p-2 rounded">
                         <span className="text-xs text-slate-300">{w.type}</span>
                         <span className="text-xs font-bold text-slate-400">{w.count} 起</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="col-span-6 flex flex-col gap-4">
             <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl relative overflow-hidden group shadow-2xl flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center text-slate-600"><Map size={64}/></div>
                <div className="text-slate-500 font-mono text-sm">GIS 实时地图与车辆轨迹监控</div>
             </div>
             <div className="h-40 grid grid-cols-4 gap-3">
                {[1,2,3,4].map(i => <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-600"><Video size={24}/></div>)}
             </div>
          </div>

          <div className="col-span-3 flex flex-col gap-4">
             <div className="bg-slate-800/50 border border-slate-700 p-0 rounded-xl flex-1 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
                   <h3 className="text-sm font-bold text-white flex items-center gap-2"><ListTodo size={16}/> 突发事件列表</h3>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
                   {incidents.map((evt, i) => (
                      <div key={i} className="p-3 rounded-lg border border-slate-600 bg-slate-700/50">
                         <h4 className="font-bold text-slate-200 mb-1">{evt.title}</h4>
                         <span className="text-xs text-slate-400">{evt.status} | {evt.level}</span>
                      </div>
                   ))}
                </div>
             </div>
             <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl h-1/3 flex flex-col">
                <h3 className="text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2"><Package size={16}/> 应急资源状态</h3>
                <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex justify-between"><span>应急救援车</span><span className="text-emerald-400">5/5 待命</span></div>
                    <div className="flex justify-between"><span>防汛沙袋</span><span className="text-emerald-400">充足</span></div>
                </div>
             </div>
          </div>
       </div>
    </div>
   );
};

// --- 5. Security Management View (Special Topic) ---
export const SecurityManagementView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
         <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Shield className="text-blue-600"/> 安全隐患管理与AI监测
         </h2>
         <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-50 text-green-700 rounded border border-green-100">
               <CheckCircle size={12}/> 系统运行正常
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700 relative">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
               <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">LIVE</span>
               <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur">AI 识别引擎开启</span>
            </div>
            <div className="grid grid-cols-2 h-96">
               {[
                  { label: '71路-车厢后门', status: '正常' },
                  { label: '71路-驾驶室', status: '警告: 驾驶员闭眼 > 2s', alert: true },
                  { label: '静安寺站台-南', status: '拥挤度: 中' },
                  { label: '维修车间-A区', status: '检测到未佩戴安全帽', alert: true },
               ].map((cam, i) => (
                  <div key={i} className="relative border border-slate-800 bg-slate-800/50 flex items-center justify-center group">
                     <div className="text-slate-600 group-hover:text-slate-500 transition-colors">
                        <Video size={32} />
                     </div>
                     <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                        <span className="text-xs text-slate-200 font-mono">{cam.label}</span>
                        {cam.alert ? (
                           <span className="text-[10px] bg-red-500/90 text-white px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                              <AlertTriangle size={10}/> {cam.status}
                           </span>
                        ) : (
                           <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                              <Check size={10}/> {cam.status}
                           </span>
                        )}
                     </div>
                     {cam.alert && <div className="absolute inset-0 border-2 border-red-500/50 animate-pulse pointer-events-none"></div>}
                  </div>
               ))}
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity size={18}/> 综合评分</h3>
               <div className="flex items-center justify-center py-6">
                  <div className="w-28 h-28 rounded-full border-8 border-emerald-100 flex flex-col items-center justify-center relative">
                     <span className="text-3xl font-bold text-emerald-600">96.5</span>
                     <span className="text-[10px] text-slate-400 uppercase">Score</span>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500"><span>整改率</span><span>98%</span></div>
                    <div className="w-full h-1 bg-slate-100 rounded-full"><div className="w-[98%] h-full bg-emerald-500"></div></div>
                  </div>
               </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1 overflow-y-auto">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Eye size={18}/> 隐患排查</h3>
               <div className="space-y-3">
                  {[
                     { desc: '灭火器压力不足', loc: '3号车间', level: '严重' },
                     { desc: '配电箱周围堆物', loc: '调度室', level: '一般' },
                  ].map((item, i) => (
                     <div key={i} className="p-2 border border-slate-100 rounded bg-slate-50">
                        <p className="text-xs font-bold text-slate-700">{item.desc}</p>
                        <p className="text-[10px] text-slate-400">{item.loc} • {item.level}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
