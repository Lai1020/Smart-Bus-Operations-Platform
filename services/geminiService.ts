import { AIRecommendation } from "../types";

/**
 * Frontend mock version
 * Used for UI rendering only
 * Safe for browser & Vercel
 */
export const getSmartMaintenancePlan = async (
  assetType: string,
  goal: string
): Promise<AIRecommendation> => {
  return {
    title: `${assetType} 智能维护建议`,
    frequency: "每月一次",
    items: [
      "检查制动系统与刹车片磨损情况",
      "检测动力电池与线路安全",
      "轮胎磨损与气压评估",
      "车载监控与通讯模块巡检"
    ],
    reason: `基于当前运营目标「${goal}」，通过周期性维护降低突发故障风险，保障公交系统稳定运行。`
  };
};
