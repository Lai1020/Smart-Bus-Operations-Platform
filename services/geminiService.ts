
import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation } from "../types";

// Always use process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartMaintenancePlan = async (assetType: string, goal: string): Promise<AIRecommendation> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a detailed maintenance plan for a public transport fleet. 
      Asset Type: ${assetType}
      Goal: ${goal}
      Context: We are a major metropolitan bus group.
      Language: Simplified Chinese.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            frequency: { type: Type.STRING },
            items: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reason: { type: Type.STRING }
          },
          required: ["title", "frequency", "items", "reason"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim()) as AIRecommendation;
    }
    throw new Error("No response from AI");
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback data
    return {
      title: "夏季专项维护计划",
      frequency: "每周一次",
      items: ["检查空调滤网", "测试冷却液位", "电池组温控系统自检"],
      reason: "预测性维护：基于季节性高温趋势，提前预防散热系统故障。"
    };
  }
};
