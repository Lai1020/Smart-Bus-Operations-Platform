
import React from 'react';
import { AlertTriangle, Siren, Video, MapPin } from 'lucide-react';

const SpecialView: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {/* Emergency Plans */}
       <div className="col-span-1 bg-rose-50 rounded-xl border border-rose-100 p-5">
          <h3 className="text-lg font-bold text-rose-600 mb-4 flex items-center gap-2">
            <AlertTriangle className="fill-rose-100"/> 应急指挥中心
          </h3>
          <div className="space-y-3">
             <button className="w-full text-left p-3 bg-white hover:bg-rose-50 border border-rose-100 rounded-lg transition-all group shadow-sm">
                <div className="flex justify-between items-center text-xs">
                   <span className="font-bold text-slate-700">台风应急预案</span>
                   <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-500">IV级</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">关联资源: 排水车, 应急电源</p>
             </button>
             <button className="w-full text-left p-3 bg-white hover:bg-rose-50 border border-rose-100 rounded-lg transition-all group shadow-sm">
                <div className="flex justify-between items-center text-xs">
                   <span className="font-bold text-slate-700">车辆碰撞应急</span>
                   <span className="px-1.5 py-0.5 bg-rose-100 text-rose-600 rounded animate-pulse font-bold">处理中</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">当前事件: 71路豫园站擦碰</p>
             </button>
          </div>
          <div className="mt-6 pt-4 border-t border-rose-200">
             <h4 className="text-xs font-bold text-rose-800 mb-2">资源联动状态</h4>
             <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-white p-2 rounded border border-rose-100 flex justify-between shadow-sm">
                   <span className="text-slate-500">无人机</span>
                   <span className="text-blue-600 font-bold">巡航中</span>
                </div>
             </div>
          </div>
       </div>

       {/* Safety Identification */}
       <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-base font-bold text-slate-800">危险源识别与回传</h3>
             <div className="flex gap-2">
               <span className="flex items-center gap-1 text-[10px] text-slate-500"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> 执法仪回传</span>
             </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 h-64">
             <div className="col-span-2 bg-slate-900 relative rounded-lg overflow-hidden border border-slate-200 shadow-inner">
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded font-bold shadow-sm">LIVE</div>
                <div className="absolute bottom-2 left-2 text-white text-[10px] bg-black/40 px-2 py-0.5 rounded">抢修队-03 执法仪画面</div>
                <div className="w-full h-full flex items-center justify-center text-slate-600 font-medium text-xs">
                   (模拟视频流：事故现场定损中)
                </div>
             </div>
             <div className="flex flex-col gap-2">
                <div className="flex-1 bg-slate-50 rounded border border-slate-200 p-3">
                   <h4 className="text-[10px] text-slate-500 font-bold mb-2 uppercase">签到人员</h4>
                   <ul className="space-y-1 text-[10px]">
                     <li className="flex justify-between"><span className="text-slate-600">张三 (组长)</span> <span className="text-emerald-600 font-bold">已到场</span></li>
                     <li className="flex justify-between"><span className="text-slate-600">李四 (电工)</span> <span className="text-emerald-600 font-bold">已到场</span></li>
                   </ul>
                </div>
                <div className="flex-1 bg-slate-50 rounded border border-slate-200 p-3">
                   <h4 className="text-[10px] text-slate-500 font-bold mb-2 uppercase">应急材料</h4>
                   <div className="flex justify-between items-center mb-1 text-[10px]">
                      <span className="text-slate-600">防汛沙袋</span>
                      <span className="font-mono text-slate-800 font-bold">200/200</span>
                   </div>
                   <div className="w-full h-1 bg-slate-200 rounded-full"><div className="w-full h-full bg-blue-500 rounded-full"></div></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
);

export default SpecialView;
