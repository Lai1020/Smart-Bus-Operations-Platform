
import React, { useState } from 'react';
import { 
  QrCode, ClipboardList, ArrowRightLeft, Search, Wifi, Box, 
  User, AlertCircle, Settings, FileCheck, FileText, Link as LinkIcon,
  Ruler, Scale, Plug, Calculator, Calendar, Shield, CheckCircle
} from 'lucide-react';

const InventoryOperationsView = () => {
  const [activeTab, setActiveTab] = useState('inbound');
  const [outboundStep, setOutboundStep] = useState(1);
  const [selectedSLA, setSelectedSLA] = useState('standard');

  // Transfer State
  const [transferStep, setTransferStep] = useState('search'); // search, list
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Mock Contract Items
  const contractItems = [
     { id: 1, name: '智能车载网关', model: 'GW-500 Pro', qty: 50, price: 2800, supplier: '深圳智行科技', warranty: '3年', depreciation: 5 },
     { id: 2, name: 'AI 乘客计数摄像头', model: 'CAM-AI-02', qty: 200, price: 1200, supplier: '深圳智行科技', warranty: '2年', depreciation: 3 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Navigation Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex gap-2 shadow-sm">
        {[
          { id: 'inbound', label: '资产入库与赋码', icon: <QrCode size={18} /> },
          { id: 'outbound', label: '领用出库与SLA定义', icon: <ClipboardList size={18} /> },
          { id: 'transfer', label: '资产移交与合同清单', icon: <ArrowRightLeft size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm min-h-[500px] p-6">
        
        {/* --- 1. INBOUND & CODING --- */}
        {activeTab === 'inbound' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">基本信息录入</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-500">资产名称</label>
                   <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:border-blue-500 focus:outline-none" placeholder="例如: 智能POS终端" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-500">分类</label>
                   <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:border-blue-500 focus:outline-none">
                      <option>车载设备</option>
                      <option>IT设施</option>
                      <option>维修工具</option>
                   </select>
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-500">品牌/型号</label>
                   <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:border-blue-500 focus:outline-none" placeholder="华为 / AR500" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-500">序列号 (SN)</label>
                   <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              
              <div className="pt-4">
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-200 transition-colors flex items-center justify-center gap-2">
                   <QrCode size={18} /> 生成数字化身份标签
                </button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-2 right-2 px-2 py-1 bg-white border border-slate-200 rounded text-[10px] text-slate-400 shadow-sm">标签预览</div>
               
               <div className="flex gap-6 items-center">
                  {/* QR Label */}
                  <div className="w-48 h-32 bg-white border-2 border-slate-800 rounded-lg p-3 shadow-lg flex gap-3 items-center relative">
                     <div className="w-20 h-20 bg-slate-900 p-1">
                        <div className="w-full h-full bg-white flex items-center justify-center">
                           <QrCode size={48} className="text-slate-900"/>
                        </div>
                     </div>
                     <div className="flex-1 space-y-1">
                        <p className="text-[10px] font-bold text-slate-500">公交智能运维</p>
                        <p className="text-sm font-bold text-slate-900 leading-tight">车载POS终端</p>
                        <p className="text-[10px] font-mono text-slate-600">ID: ZC-2024-8892</p>
                     </div>
                  </div>

                  {/* RFID Label */}
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 shadow-lg flex flex-col justify-between text-white relative group cursor-pointer hover:scale-105 transition-transform">
                     <Wifi size={24} className="opacity-80 rotate-90" />
                     <div className="text-right">
                        <p className="text-[10px] opacity-70">RFID EPC</p>
                        <p className="text-xs font-mono font-bold tracking-widest">E200 6802</p>
                     </div>
                     <div className="absolute inset-0 border-2 border-white/20 rounded-xl pointer-events-none"></div>
                  </div>
               </div>
               
               <p className="mt-8 text-sm text-slate-500 text-center max-w-xs">
                  系统已自动绑定物理ID。请连接打印机输出标签，并粘贴于资产显著位置。
               </p>
            </div>
          </div>
        )}

        {/* --- 2. OUTBOUND & SLA CONFIGURATION --- */}
        {activeTab === 'outbound' && (
           <div className="max-w-4xl mx-auto">
              {/* Stepper */}
              <div className="flex items-center justify-center mb-8">
                 {[
                    { step: 1, label: '选择资产' },
                    { step: 2, label: '指定领用人' },
                    { step: 3, label: '配置运维SLA' }, // Key Step
                 ].map((s, idx) => (
                    <div key={idx} className="flex items-center">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${outboundStep >= s.step ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {s.step}
                       </div>
                       <span className={`ml-2 text-sm font-medium ${outboundStep >= s.step ? 'text-blue-700' : 'text-slate-400'}`}>{s.label}</span>
                       {idx !== 2 && <div className={`w-12 h-0.5 mx-4 ${outboundStep > s.step ? 'bg-blue-600' : 'bg-slate-200'}`}></div>}
                    </div>
                 ))}
              </div>

              {/* Step Content */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[300px]">
                 
                 {outboundStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                       <h3 className="font-bold text-slate-700">请选择出库资产</h3>
                       <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="text" placeholder="扫描二维码 或 输入资产编码..." className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" />
                       </div>
                       <div className="space-y-2 mt-4">
                          <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center hover:border-blue-500 cursor-pointer transition-colors shadow-sm">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Box size={20}/></div>
                                <div>
                                   <p className="font-bold text-slate-800">库存-手持POS机 V2</p>
                                   <p className="text-xs text-slate-500 font-mono">SN: POS-992-001</p>
                                </div>
                             </div>
                             <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">闲置中</span>
                          </div>
                       </div>
                    </div>
                 )}

                 {outboundStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                       <h3 className="font-bold text-slate-700">指定领用人/责任人</h3>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500">领用部门</label>
                             <select className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm">
                                <option>客运一部</option>
                                <option>维修中心</option>
                                <option>信息技术部</option>
                             </select>
                          </div>
                          <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-500">领用人 (责任主体)</label>
                             <div className="flex gap-2">
                                <select className="flex-1 bg-white border border-slate-200 rounded-lg p-2.5 text-sm">
                                   <option>张三 (工号: 1002)</option>
                                   <option>李四 (工号: 1003)</option>
                                </select>
                                <button className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600"><User size={18} /></button>
                             </div>
                          </div>
                       </div>
                       <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex gap-2 text-sm text-amber-800">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          <p>注意：该资产属于贵重设备，领用后责任人将承担保管义务。</p>
                       </div>
                    </div>
                 )}

                 {outboundStep === 3 && (
                    <div className="space-y-6 animate-fade-in">
                       <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-700 flex items-center gap-2">
                             <Settings size={18} className="text-blue-600"/> 配置运维 SLA 标准
                          </h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">关键步骤</span>
                       </div>
                       
                       {/* Pre-set Templates */}
                       <div className="grid grid-cols-3 gap-3">
                          {['标准IT设备', '关键营运车辆', '一般办公设施'].map(t => (
                             <button 
                                key={t}
                                onClick={() => setSelectedSLA('standard')} 
                                className={`text-xs py-2 px-3 rounded-lg border transition-colors ${selectedSLA === 'standard' && t === '标准IT设备' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                             >
                                {t} 模板
                             </button>
                          ))}
                       </div>

                       {/* Detailed Configuration */}
                       <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4 shadow-sm">
                          
                          {/* 1. Maintenance Content */}
                          <div>
                             <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">日常运维内容 (Checklist)</label>
                             <div className="space-y-2">
                                {['检查设备外观是否有破损', '测试电源开启与关闭响应', '清洁屏幕与按键区域'].map((item, i) => (
                                   <div key={i} className="flex items-center gap-2">
                                      <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                      <span className="text-sm text-slate-700">{item}</span>
                                   </div>
                                ))}
                                <div className="flex items-center gap-2 text-blue-600 text-sm cursor-pointer hover:underline">
                                   <span>+ 添加检查项</span>
                                </div>
                             </div>
                          </div>

                          <div className="grid grid-cols-2 gap-6 pt-2">
                             {/* 2. Frequency */}
                             <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">运维/巡检频率</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none">
                                   <option>每日一次 (Daily)</option>
                                   <option>每周一次 (Weekly)</option>
                                   <option>每月一次 (Monthly)</option>
                                </select>
                             </div>

                             {/* 3. Response Level */}
                             <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">故障响应等级 (SLA)</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none">
                                   <option>一级响应 (30分钟内到场)</option>
                                   <option>二级响应 (2小时内处理)</option>
                                   <option>三级响应 (24小时内解决)</option>
                                </select>
                             </div>
                          </div>
                       </div>
                    </div>
                 )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                 <button 
                    disabled={outboundStep === 1}
                    onClick={() => setOutboundStep(p => p - 1)}
                    className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                 >
                    上一步
                 </button>
                 <button 
                    onClick={() => outboundStep < 3 ? setOutboundStep(p => p + 1) : alert("出库成功！运维规则已下发至责任人端。")}
                    className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-200 transition-colors"
                 >
                    {outboundStep === 3 ? '确认出库并生效SLA' : '下一步'}
                 </button>
              </div>
           </div>
        )}

        {/* --- 3. TRANSFER (Contract Based) --- */}
        {activeTab === 'transfer' && (
           <div className="space-y-6">
              {transferStep === 'search' ? (
                 <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-fade-in">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                       <FileCheck size={32} className="text-blue-600" />
                    </div>
                    <div className="text-center space-y-2">
                       <h3 className="text-xl font-bold text-slate-800">合同清单资产移交</h3>
                       <p className="text-slate-500 text-sm max-w-md">请输入采购合同编号或名称，系统将自动调取合同清单进行批量移交与入库。</p>
                    </div>
                    <div className="w-full max-w-lg relative">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                       <input 
                         type="text" 
                         placeholder="例如: HT-2024-09-001 或 2024年度车载终端采购" 
                         className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-base"
                       />
                       <button 
                         onClick={() => setTransferStep('list')}
                         className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-bold transition-colors"
                       >
                         查询合同
                       </button>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-400 mt-4">
                       <span className="flex items-center gap-1"><FileText size={12}/> 支持模糊搜索</span>
                       <span className="flex items-center gap-1"><LinkIcon size={12}/> 自动关联供应商</span>
                    </div>
                 </div>
              ) : (
                 <div className="animate-fade-in space-y-6">
                    {/* Contract Header Info */}
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-wrap gap-6 items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                             <FileCheck size={24} className="text-blue-600" />
                          </div>
                          <div>
                             <h3 className="font-bold text-slate-800 text-lg">2024年度智能车载终端采购项目</h3>
                             <p className="text-xs text-slate-500 font-mono mt-0.5">合同编号: HT-2024-09-001</p>
                          </div>
                       </div>
                       <div className="flex gap-6 text-sm">
                          <div>
                             <p className="text-xs text-slate-400 mb-0.5">供应商</p>
                             <p className="font-bold text-slate-700">深圳智行科技有限公司</p>
                          </div>
                          <div>
                             <p className="text-xs text-slate-400 mb-0.5">签订日期</p>
                             <p className="font-bold text-slate-700">2024-01-15</p>
                          </div>
                          <div>
                             <p className="text-xs text-slate-400 mb-0.5">总金额</p>
                             <p className="font-bold text-slate-700">¥ 2,850,000</p>
                          </div>
                       </div>
                       <button 
                         onClick={() => setTransferStep('search')}
                         className="text-slate-400 hover:text-slate-600 text-sm underline"
                       >
                         重新查询
                       </button>
                    </div>

                    {/* Manifest Table */}
                    <div>
                       <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-slate-700 flex items-center gap-2">
                             <ClipboardList size={18} /> 移交清单明细
                          </h4>
                          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100">请勾选并补充完善资产信息</span>
                       </div>
                       
                       <div className="border border-slate-200 rounded-xl overflow-hidden">
                          <table className="w-full text-sm text-left">
                             <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                <tr>
                                   <th className="p-4 w-12"><input type="checkbox" className="rounded text-blue-600"/></th>
                                   <th className="p-4">资产名称</th>
                                   <th className="p-4">规格型号</th>
                                   <th className="p-4">合同数量</th>
                                   <th className="p-4">单价 (¥)</th>
                                   <th className="p-4 text-right">操作</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-100">
                                {contractItems.map((item) => (
                                   <React.Fragment key={item.id}>
                                      <tr className={`hover:bg-blue-50/30 transition-colors ${expandedRow === item.id ? 'bg-blue-50/50' : 'bg-white'}`}>
                                         <td className="p-4"><input type="checkbox" className="rounded text-blue-600"/></td>
                                         <td className="p-4 font-bold text-slate-800">{item.name}</td>
                                         <td className="p-4 text-slate-600 font-mono">{item.model}</td>
                                         <td className="p-4 text-slate-600">{item.qty}</td>
                                         <td className="p-4 font-mono">{item.price.toLocaleString()}</td>
                                         <td className="p-4 text-right">
                                            <button 
                                              onClick={() => setExpandedRow(expandedRow === item.id ? null : item.id)}
                                              className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${expandedRow === item.id ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400'}`}
                                            >
                                              {expandedRow === item.id ? '收起详情' : '补充信息'}
                                            </button>
                                         </td>
                                      </tr>
                                      {/* Expanded Detail Form */}
                                      {expandedRow === item.id && (
                                         <tr className="bg-slate-50/80 border-b border-slate-100">
                                            <td colSpan={6} className="p-6">
                                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                                                  {/* Physical Specs */}
                                                  <div className="space-y-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                                                     <h5 className="font-bold text-slate-700 text-xs flex items-center gap-1 mb-2 border-b border-slate-100 pb-2">
                                                        <Ruler size={14} className="text-blue-500"/> 物理属性
                                                     </h5>
                                                     <div>
                                                        <label className="text-[10px] font-bold text-slate-400 block mb-1">体积 (长*宽*高 mm)</label>
                                                        <div className="flex gap-1">
                                                           <input type="number" placeholder="L" className="w-full border rounded px-2 py-1 text-xs"/>
                                                           <span className="text-slate-300">x</span>
                                                           <input type="number" placeholder="W" className="w-full border rounded px-2 py-1 text-xs"/>
                                                           <span className="text-slate-300">x</span>
                                                           <input type="number" placeholder="H" className="w-full border rounded px-2 py-1 text-xs"/>
                                                        </div>
                                                     </div>
                                                     <div>
                                                        <label className="text-[10px] font-bold text-slate-400 block mb-1">重量 (kg)</label>
                                                        <div className="relative">
                                                           <Scale size={12} className="absolute left-2 top-1.5 text-slate-400"/>
                                                           <input type="number" className="w-full pl-6 border rounded px-2 py-1 text-xs"/>
                                                        </div>
                                                     </div>
                                                     <div>
                                                        <label className="text-[10px] font-bold text-slate-400 block mb-1">额定功耗 (W)</label>
                                                        <div className="relative">
                                                           <Plug size={12} className="absolute left-2 top-1.5 text-slate-400"/>
                                                           <input type="number" className="w-full pl-6 border rounded px-2 py-1 text-xs"/>
                                                        </div>
                                                     </div>
                                                  </div>

                                                  {/* Financial Info */}
                                                  <div className="space-y-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                                                     <h5 className="font-bold text-slate-700 text-xs flex items-center gap-1 mb-2 border-b border-slate-100 pb-2">
                                                        <Calculator size={14} className="text-emerald-500"/> 财务与采购
                                                     </h5>
                                                     <div>
                                                        <label className="text-[10px] font-bold text-slate-400 block mb-1">资产采购人</label>
                                                        <input type="text" defaultValue="张建国" className="w-full border rounded px-2 py-1 text-xs"/>
                                                     </div>
                                                     <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                           <label className="text-[10px] font-bold text-slate-400 block mb-1">折旧年限 (年)</label>
                                                           <input type="number" defaultValue={item.depreciation} className="w-full border rounded px-2 py-1 text-xs"/>
                                                        </div>
                                                        <div>
                                                           <label className="text-[10px] font-bold text-slate-400 block mb-1">当前残值 (¥)</label>
                                                           <input type="number" defaultValue={item.price * 0.05} className="w-full border rounded px-2 py-1 text-xs"/>
                                                        </div>
                                                     </div>
                                                  </div>

                                                  {/* Warranty & Ops */}
                                                  <div className="space-y-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                                                     <h5 className="font-bold text-slate-700 text-xs flex items-center gap-1 mb-2 border-b border-slate-100 pb-2">
                                                        <Shield size={14} className="text-amber-500"/> 运维保障
                                                     </h5>
                                                     <div>
                                                        <label className="text-[10px] font-bold text-slate-400 block mb-1">质保期限</label>
                                                        <div className="relative">
                                                           <Calendar size={12} className="absolute left-2 top-1.5 text-slate-400"/>
                                                           <input type="text" defaultValue={item.warranty} className="w-full pl-6 border rounded px-2 py-1 text-xs"/>
                                                        </div>
                                                     </div>
                                                     <div className="pt-2">
                                                        <label className="flex items-center gap-2 mb-2 cursor-pointer">
                                                           <input type="checkbox" className="rounded text-blue-600"/>
                                                           <span className="text-xs font-bold text-slate-600">属于备件/附属资产?</span>
                                                        </label>
                                                        <div className="relative">
                                                           <LinkIcon size={12} className="absolute left-2 top-1.5 text-slate-400"/>
                                                           <input type="text" placeholder="关联主资产ID (选填)" className="w-full pl-6 border rounded px-2 py-1 text-xs bg-slate-50"/>
                                                        </div>
                                                     </div>
                                                  </div>
                                               </div>
                                            </td>
                                         </tr>
                                      )}
                                   </React.Fragment>
                                ))}
                             </tbody>
                          </table>
                       </div>

                       <div className="mt-6 flex justify-end gap-4">
                          <button className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium">取消</button>
                          <button className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-200 flex items-center gap-2">
                             <CheckCircle size={18} /> 确认移交并入库
                          </button>
                       </div>
                    </div>
                 </div>
              )}
           </div>
        )}
      </div>
    </div>
  );
};

export default InventoryOperationsView;
