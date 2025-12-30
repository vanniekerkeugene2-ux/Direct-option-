import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, MarketDataPoint, TradeRecord, TradingMode, StrategyMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzeMarket(
  asset: string,
  history: MarketDataPoint[],
  tradeHistory: TradeRecord[],
  mode: TradingMode,
  strategy: StrategyMode
): Promise<AnalysisResult> {
  const latestData = history[history.length - 1];
  const prompt = `Analyze ${asset} trading as ${strategy} for ${mode} mode. Current Price: ${latestData.price}. Use SMC/ICT methods. Output JSON only.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            signal: { type: Type.STRING, enum: ['CALL', 'PUT', 'BUY', 'SELL', 'NEUTRAL'] },
            confidence: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            indicators: {
              type: Type.OBJECT,
              properties: {
                rsi: { type: Type.STRING }, trend: { type: Type.STRING }, volatility: { type: Type.STRING },
                liquidity: { type: Type.STRING }, volumeProfile: { type: Type.STRING }, luxSignal: { type: Type.STRING },
                msgSignal: { type: Type.STRING }, superTrend: { type: Type.STRING }, smcBreaker: { type: Type.STRING },
                ictModel: { type: Type.STRING }
              }
            },
            strategySuggestion: { type: Type.STRING }
          },
          required: ['signal', 'confidence', 'reasoning', 'indicators', 'strategySuggestion']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    return {
      signal: 'NEUTRAL', confidence: 0, reasoning: "Error syncing node.",
      indicators: { rsi: "ERR", trend: "ERR", volatility: "ERR", liquidity: "ERR", volumeProfile: "ERR", luxSignal: "ERR", msgSignal: "ERR", superTrend: "ERR", smcBreaker: "ERR", ictModel: "ERR" },
      strategySuggestion: "Stay Neutral."
    };
  }
}