
import React from 'react';
import { 
  Monitor, Box, Wrench, DollarSign, BarChart2, AlertTriangle, BookOpen, Settings, Shield, Siren, Cpu 
} from 'lucide-react';

export const MENU_STRUCTURE = [
  {
    id: 'cockpit',
    title: '监视驾驶舱',
    icon: <Monitor size={20} />,
    children: [
      { id: 'cockpit-integrated', title: '综合监控' },
      { id: 'cockpit-network', title: '网络监控' },
      { id: 'cockpit-energy', title: '能耗用电监控' },
    ]
  },
  {
    id: 'assets',
    title: '资产管理',
    icon: <Box size={20} />,
    children: [
      { id: 'asset-overview', title: '资产概览' },
      { id: 'asset-list', title: '资产列表' },
      { id: 'asset-inventory', title: '库存作业中心' },
    ]
  },
  {
    id: 'workorder',
    title: '智能工单系统',
    icon: <Wrench size={20} />,
    children: [
      { id: 'wo-overview', title: '工单概览' },
      { id: 'wo-repair', title: '报修管理' },
      { id: 'wo-list', title: '工单列表' },
      { id: 'wo-inspection', title: '巡检计划' },
    ]
  },
  {
    id: 'maintenance',
    title: '预防性维护引擎',
    icon: <Cpu size={20} />,
    children: [
      { id: 'maintenance-dashboard', title: '核心监控仪表盘' },
      { id: 'maintenance-scheduling', title: '智能调度优化' },
      { id: 'maintenance-inspections', title: '预防性巡检计划' },
      { id: 'maintenance-spares', title: '智能备件管理' },
      { id: 'maintenance-knowledge', title: '维修知识采集' },
    ]
  },
  {
    id: 'decision',
    title: '辅助决策系统',
    icon: <BarChart2 size={20} />,
    children: [
      { id: 'decision-efficiency', title: '资产效能分析' },
      { id: 'decision-wo-analysis', title: '工单分析评价' },
      { id: 'decision-fault-tree', title: '故障-成本树' },
    ]
  },
  {
    id: 'cost',
    title: '成本与经营',
    icon: <DollarSign size={20} />,
    children: [
      { id: 'cost-revenue', title: '资产营收分析' },
      { id: 'cost-calc', title: '全成本核算中心' },
    ]
  },
  {
    id: 'safety',
    title: '安全管理中心',
    icon: <Shield size={20} />,
    children: [
      { id: 'safety-cockpit', title: '全览驾驶舱' },
      { id: 'safety-prevention', title: '事前预防管理' },
      { id: 'safety-monitoring', title: '事中实时监控' },
      { id: 'safety-station', title: '场站安全' },
      { id: 'safety-analysis', title: '事后分析复盘' },
    ]
  },
  {
    id: 'emergency',
    title: '应急指挥中心',
    icon: <Siren size={20} />,
    children: [
      { id: 'emergency-command', title: '指挥调度大屏' },
      { id: 'emergency-risk', title: '危险源智能识别' }, 
      { id: 'emergency-plan', title: '数字化应急预案' }, 
      { id: 'emergency-resources', title: '应急资源管理' },
    ]
  },
  {
    id: 'special',
    title: '业务专题',
    icon: <AlertTriangle size={20} />,
    children: [
      { id: 'special-brt', title: 'BRT降本增效' },
      { id: 'special-brt-unattended', title: 'BRT无人值守' },
      { id: 'special-property', title: '物业管理' },
    ]
  },
  {
    id: 'knowledge',
    title: '知识库',
    icon: <BookOpen size={20} />,
    children: [
      { id: 'kb-query', title: '知识库查询' },
      { id: 'kb-training', title: '培训计划' },
    ]
  },
  {
    id: 'system',
    title: '系统管理',
    icon: <Settings size={20} />,
    children: [
      { id: 'sys-dept', title: '部门设置' },
      { id: 'sys-user', title: '人员权限' },
    ]
  },
];
