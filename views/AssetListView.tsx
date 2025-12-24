
import React from 'react';
import { Search, CheckCircle, FileText } from 'lucide-react';
import { Asset } from '../types';

interface AssetListViewProps {
  onSelectAsset: (id: string) => void;
}

const AssetListView: React.FC<AssetListViewProps> = ({ onSelectAsset }) => {
  const assets: Asset[] = [
    { id: 'ZC-2023-001', name: '纯电动客车 (12m)', vendor: '宇通客车', date: '2023-01-15', status: '运营中', life: '88%', value: '¥850,000' },
    { id: 'ZC-2023-005', name: '自动洗车机', vendor: '海德森', date: '2022-11-20', status: '维护中', life: '76%', value: '¥120,000' },
    { id: 'ZC-2021-112', name: 'IT服务器机柜', vendor: '华为', date: '2021-06-10', status: '运营中', life: '65%', value: '¥45,000' },
    { id: 'ZC-2024-022', name: '手持POS终端', vendor: '雄帝科技', date: '2024-03-01', status: '库存', life: '100%', value: '¥2,500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="输入资产编码/RFID..." className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
          </div>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none focus:border-blue-500">
            <option>全部类型</option>
            <option>营运车辆</option>
            <option>维修设备</option>
            <option>IT设施</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none focus:border-blue-500">
            <option>状态: 全部</option>
            <option>正常</option>
            <option>维修中</option>
            <option>闲置</option>
          </select>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-sm shadow-blue-200">
              <CheckCircle size={16} /> 资产移交入库
           </button>
           <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 px-4 py-2 rounded-lg text-sm transition-colors">
              <FileText size={16} /> 导出报表
           </button>
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold">
            <tr>
              <th className="p-4">资产编码</th>
              <th className="p-4">资产名称</th>
              <th className="p-4">供应商</th>
              <th className="p-4">购入日期</th>
              <th className="p-4">全生命周期状态</th>
              <th className="p-4">预判寿命</th>
              <th className="p-4">残值</th>
              <th className="p-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assets.map((row, idx) => (
              <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 font-mono text-blue-600 font-medium">{row.id}</td>
                <td className="p-4 text-slate-800 font-medium">{row.name}</td>
                <td className="p-4 text-slate-500">{row.vendor}</td>
                <td className="p-4 text-slate-500">{row.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${
                    row.status === '运营中' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    row.status === '维护中' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{width: row.life}}></div>
                    </div>
                    <span className="text-xs">{row.life}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-700 font-mono">{row.value}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => onSelectAsset(row.id)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold border border-blue-200 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    全息画像
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-slate-100 text-center text-xs text-slate-500 bg-slate-50/50">
          显示 4 条，共 2,304 条资产记录
        </div>
      </div>
    </div>
  );
};

export default AssetListView;
