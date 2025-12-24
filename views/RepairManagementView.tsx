
import React, { useState } from 'react';
import { Wrench, Phone, QrCode, Search, AlertCircle } from 'lucide-react';

const RepairManagementView: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-sm">
          <Wrench size={56} className="mx-auto text-blue-100 mb-6" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">报修管理中心</h3>
          <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">此处为报修入口与原始记录管理。查看详细工单进度请前往“工单列表”。</p>
          <div className="flex justify-center gap-4">
             <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">
                + 新增报修
             </button>
          </div>
       </div>

       {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">新增报修单</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">报修来源</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2 border border-blue-500 bg-blue-50 text-blue-700 rounded-lg font-bold text-sm">
                    <Phone size={16}/> 人工填报 / 12345
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm">
                    <QrCode size={16}/> 补录扫码记录
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">报修资产对象</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
                  <input type="text" placeholder="输入资产编号或名称" className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"/>
                </div>
                <p className="text-[10px] text-amber-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={10}/> 若不指定资产，工单将自动流入“工单池”等待人工分配
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">故障描述</label>
                <textarea className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-blue-500 outline-none h-24" placeholder="请详细描述故障现象..."></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 text-sm">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg">取消</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-200">提交报修</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairManagementView;
