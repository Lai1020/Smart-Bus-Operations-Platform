
import React, { useState, useEffect } from 'react';
import { 
  Users, Car, Zap, Thermometer, Wind, Lightbulb, 
  Activity, Calendar, ShieldCheck, Unlock, AlertCircle,
  Power, MapPin, Building2, Search
} from 'lucide-react';

// --- Mock Data ---

const initialRooms = [
  { id: 101, name: '101 核心机房', floor: '1F', type: 'special', light: true, ac: true, temp: 20.5, humidity: 45, pressure: 25, energyLight: 1.2, energyAC: 5.8 },
  { id: 201, name: '201 大会议室', floor: '2F', type: 'meeting', light: false, ac: false, temp: 24.0, humidity: 55, pressure: 0, energyLight: 0.0, energyAC: 0.0 },
  { id: 202, name: '202 财务办公室', floor: '2F', type: 'office', light: true, ac: true, temp: 25.5, humidity: 50, pressure: 5, energyLight: 0.8, energyAC: 2.2 },
  { id: 305, name: '305 研发实验室', floor: '3F', type: 'special', light: true, ac: true, temp: 22.0, humidity: 40, pressure: 30, energyLight: 1.5, energyAC: 4.0 },
  { id: 306, name: '306 开放办公区', floor: '3F', type: 'office', light: true, ac: false, temp: 26.0, humidity: 60, pressure: 2, energyLight: 2.1, energyAC: 0.5 },
  { id: 1001, name: '10F 总裁办公室', floor: '10F', type: 'office', light: false, ac: false, temp: 23.5, humidity: 52, pressure: 0, energyLight: 0.0, energyAC: 0.0 },
];

const initialVisitorLogs = [
  { id: 1, name: '张伟', company: '科技创新有限公司', carPlate: '沪A·88***', status: '已报备', meetingRoom: '201 大会议室', time: '09:30 - 11:30', parkingSpot: 'B1-A08' },
  { id: 2, name: '李娜', company: '汇通物流', carPlate: '无', status: '待审批', meetingRoom: '待定', time: '14:00 - 15:00', parkingSpot: null },
  { id: 3, name: 'Michael Chen', company: 'Global Tech', carPlate: '苏E·55***', status: '已入园', meetingRoom: '10F 总裁办', time: '10:00 - 12:00', parkingSpot: '' },
  { id: 4, name: '王强', company: '绿地物业', carPlate: '浙B·12***', status: '已报备', meetingRoom: '物业中心', time: '15:30 - 16:30', parkingSpot: 'none' },
];

const accessDevices = [
  { id: 'G01', name: '园区北门入口道闸', type: 'car', status: 'online', mode: '自动识别' },
  { id: 'G02', name: '园区北门出口道闸', type: 'car', status: 'online', mode: '自动识别' },
  { id: 'D01', name: '1F 大堂主门禁', type: 'door', status: 'online', mode: '人脸/刷卡' },
  { id: 'D02', name: '101 机房生物识别', type: 'door', status: 'online', mode: '指纹+人脸' },
  { id: 'D03', name: '2F 财务室门禁', type: 'door', status: 'warning', mode: '常闭' },
];

const PropertyManagementView = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [rooms, setRooms] = useState(initialRooms);
  const [visitorLogs, setVisitorLogs] = useState(initialVisitorLogs);

  const toggleRoomDevice = (id: number, device: 'light' | 'ac') => {
    setRooms(rooms.map(room => {
      if (room.id === id) {
        return { ...room, [device]: !room[device] };
      }
      return room;
    }));
  };

  const handleParkingAssign = (id: number, value: string) => {
    setVisitorLogs(visitorLogs.map(log => {
      if (log.id === id) {
        return { ...log, parkingSpot: value };
      }
      return log;
    }));
  };

  // --- Sub-Components ---

  const StatCard = ({ title, value, unit, icon: Icon, colorClass, trend }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${colorClass}`}>
        <Icon size={60} />
      </div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-slate-800">{value}</span>
            <span className="text-slate-400 text-sm">{unit}</span>
          </div>
        </div>
        <div className={`p-2 rounded-lg bg-opacity-10 ${colorClass.replace('text-', 'bg-')} ${colorClass}`}>
          <Icon size={20} />
        </div>
      </div>
      {trend && (
        <div className="text-xs flex items-center space-x-1">
          <span className={trend > 0 ? 'text-emerald-500' : 'text-rose-500'}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-slate-400">较昨日</span>
        </div>
      )}
    </div>
  );

  const RoomControlCard = ({ room }: any) => (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mr-2 border border-blue-100">{room.floor}</span>
          <span className="font-semibold text-slate-800">{room.name}</span>
        </div>
        {room.pressure > 10 && (
           <div className="flex items-center text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded animate-pulse border border-amber-100">
             <AlertCircle size={10} className="mr-1" /> 正压保护中
           </div>
        )}
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="text-center p-2 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-slate-400 text-[10px] mb-1 flex justify-center items-center"><Thermometer size={10} className="mr-1"/>温度</div>
            <div className="text-slate-800 font-mono font-bold text-xs">{room.temp}°C</div>
          </div>
          <div className="text-center p-2 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-slate-400 text-[10px] mb-1 flex justify-center items-center"><Wind size={10} className="mr-1"/>湿度</div>
            <div className="text-slate-800 font-mono font-bold text-xs">{room.humidity}%</div>
          </div>
          <div className="text-center p-2 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-slate-400 text-[10px] mb-1 flex justify-center items-center"><Activity size={10} className="mr-1"/>气压</div>
            <div className={`font-mono font-bold text-xs ${room.pressure > 20 ? 'text-emerald-600' : 'text-slate-800'}`}>
              {room.pressure} <span className="text-[10px] text-slate-400">Pa</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
            <h4 className="text-[10px] text-slate-400 mb-2 uppercase tracking-wider font-bold">实时能耗 (kW)</h4>
            <div className="flex items-center space-x-2 text-xs mb-2">
                <Lightbulb size={12} className="text-yellow-500" />
                <div className="w-16 text-slate-500">照明</div>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400" style={{ width: `${(room.energyLight / 3) * 100}%` }}></div>
                </div>
                <div className="w-8 text-right text-slate-600 font-mono font-bold">{room.light ? room.energyLight : 0}</div>
            </div>
            <div className="flex items-center space-x-2 text-xs">
                <Wind size={12} className="text-cyan-500" />
                <div className="w-16 text-slate-500">空调</div>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: `${(room.energyAC / 8) * 100}%` }}></div>
                </div>
                <div className="w-8 text-right text-slate-600 font-mono font-bold">{room.ac ? room.energyAC : 0}</div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => toggleRoomDevice(room.id, 'light')}
            className={`flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors border shadow-sm ${
              room.light 
                ? 'bg-yellow-50 border-yellow-200 text-yellow-600 hover:bg-yellow-100' 
                : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            <Power size={14} />
            <span className="text-xs font-bold">照明 {room.light ? 'ON' : 'OFF'}</span>
          </button>
          <button 
            onClick={() => toggleRoomDevice(room.id, 'ac')}
            className={`flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors border shadow-sm ${
              room.ac 
                ? 'bg-cyan-50 border-cyan-200 text-cyan-600 hover:bg-cyan-100' 
                : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            <Power size={14} />
            <span className="text-xs font-bold">空调 {room.ac ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  // --- Views ---

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="今日访客" value="124" unit="人" icon={Users} colorClass="text-blue-600" trend={12} />
        <StatCard title="当前园区车辆" value="86" unit="辆" icon={Car} colorClass="text-indigo-600" trend={-5} />
        <StatCard title="实时总功率" value="3,420" unit="kW" icon={Zap} colorClass="text-amber-500" trend={8} />
        <StatCard title="平均室温" value="23.4" unit="°C" icon={Thermometer} colorClass="text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6 h-96 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50 opacity-50"></div>
          <div className="text-center z-10">
             <div className="w-32 h-32 border-4 border-white bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-100 animate-pulse">
                <ShieldCheck size={48} className="text-blue-600" />
             </div>
             <h3 className="text-xl font-bold text-slate-800">园区安全态势感知</h3>
             <p className="text-slate-500 mt-2 text-sm font-medium">系统运行正常 | 设备在线率 99.8%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 overflow-hidden flex flex-col">
          <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2 text-sm">
            <AlertCircle size={18} className="text-rose-500" />
            实时告警 / 事件
          </h3>
          <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-2">
            {[
              { time: '10:42:15', msg: '2F 财务室门禁 非授权访问', level: 'high' },
              { time: '09:15:00', msg: '101 机房 气压值偏低 (18Pa)', level: 'med' },
              { time: '08:30:22', msg: 'B1 停车场 照明回路异常', level: 'low' },
            ].map((alert, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-rose-50/50 rounded-lg border-l-4 border-rose-500">
                <div className="text-slate-400 text-[10px] whitespace-nowrap font-mono">{alert.time}</div>
                <div className="text-xs text-slate-700 font-bold">{alert.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSmartControl = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">智能照明与环境控制</h2>
          <p className="text-slate-500 text-xs mt-1 font-medium">实时监控各楼层房间状态，支持远程启停设备</p>
        </div>
        <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 shadow-sm transition-colors">全开模式</button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 shadow-sm transition-colors">节能模式</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <RoomControlCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );

  const renderAccessVisitor = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col min-h-[500px]">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center">
                <Calendar size={18} className="mr-2 text-blue-600" /> 访客预约管理
            </h3>
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold transition-all shadow-md shadow-blue-200">
                + 新增预约
            </button>
        </div>
        
        <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-50">
                        <th className="pb-3 pl-2">访客信息</th>
                        <th className="pb-3">车辆</th>
                        <th className="pb-3">车位分配</th>
                        <th className="pb-3">状态</th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                    {visitorLogs.map(log => (
                        <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                            <td className="py-4 pl-2">
                                <div className="text-slate-800 font-bold">{log.name}</div>
                                <div className="text-slate-500 text-[10px]">{log.company}</div>
                            </td>
                            <td className="py-4">
                                {log.carPlate !== '无' ? (
                                    <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-mono border border-indigo-100 font-bold">
                                        {log.carPlate}
                                    </span>
                                ) : (
                                    <span className="text-slate-300 text-[10px]">无车</span>
                                )}
                            </td>
                            <td className="py-4">
                                {log.carPlate !== '无' ? (
                                    <div className="flex items-center">
                                        <select 
                                            className={`bg-white border text-[10px] font-bold rounded px-1 py-0.5 outline-none focus:border-blue-500 transition-colors cursor-pointer ${
                                                log.parkingSpot === '' ? 'border-amber-200 text-amber-600' : 
                                                log.parkingSpot === 'none' ? 'border-slate-200 text-slate-400' :
                                                'border-emerald-200 text-emerald-600'
                                            }`}
                                            value={log.parkingSpot || ''}
                                            onChange={(e) => handleParkingAssign(log.id, e.target.value)}
                                        >
                                            <option value="">待分配</option>
                                            <option value="none">不安排</option>
                                            <option value="B1-A08">B1-A08</option>
                                            <option value="B1-A09">B1-A09</option>
                                            <option value="B1-C02">B1-C02</option>
                                        </select>
                                    </div>
                                ) : <span className="text-slate-300">-</span>}
                            </td>
                            <td className="py-4">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                    log.status === '已报备' ? 'bg-emerald-100 text-emerald-600' :
                                    log.status === '已入园' ? 'bg-blue-100 text-blue-600' :
                                    'bg-amber-100 text-amber-600'
                                }`}>{log.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col">
        <h3 className="text-base font-bold text-slate-800 flex items-center mb-6">
            <ShieldCheck className="mr-2 text-emerald-500" /> 出入口与门禁状态
        </h3>

        <div className="space-y-4 flex-1">
            {accessDevices.map((device, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                            device.status === 'online' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                        }`}>
                            {device.type === 'car' ? <Car size={16} /> : <Unlock size={16} />}
                        </div>
                        <div>
                            <div className="text-slate-800 font-bold text-xs">{device.name}</div>
                            <div className="text-slate-400 text-[10px]">模式: {device.mode}</div>
                        </div>
                    </div>
                    <div className={`flex items-center text-[10px] font-bold ${
                        device.status === 'online' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            device.status === 'online' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'
                        }`}></div>
                        {device.status === 'online' ? '正常' : '异常'}
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
             <div className="text-xs text-blue-700 font-bold mb-1">系统联动提示</div>
             <p className="text-[10px] text-blue-600 leading-relaxed font-medium">
                 访客车辆 [沪A·88***] 已分配车位 [B1-A08]，北门道闸将开启引导屏显示导航路径。
             </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-1 rounded-xl border border-slate-200 inline-flex shadow-sm">
         {[
           { id: 'dashboard', label: '全景态势驾驶舱', icon: Activity },
           { id: 'smart', label: '智能楼宇控制', icon: Lightbulb },
           { id: 'access', label: '通行与访客管理', icon: Car },
         ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <tab.icon size={18}/> {tab.label}
            </button>
         ))}
      </div>

      <div className="min-h-[500px]">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'smart' && renderSmartControl()}
        {activeTab === 'access' && renderAccessVisitor()}
      </div>
    </div>
  );
};

export default PropertyManagementView;
