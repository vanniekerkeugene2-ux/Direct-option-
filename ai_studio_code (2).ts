export interface MarketDataPoint {
  time: string;
  price: number;
  rsi: number;
  ma7: number;
  ma25: number;
}

export type TradingMode = 'BINARY' | 'FOREX';
export type StrategyMode = 'CONSERVATIVE' | 'AGGRESSIVE';
export type TradeStatus = 'PENDING' | 'RESOLVED';
export type TradeOutcome = 'WIN' | 'LOSS' | 'DRAW';

export interface TradeRecord {
  id: string;
  timestamp: number;
  expirationTimestamp: number;
  asset: string;
  priceAtSignal: number;
  exitPrice?: number;
  signal: 'CALL' | 'PUT' | 'BUY' | 'SELL';
  confidence: number;
  status: TradeStatus;
  outcome?: TradeOutcome;
  reasoning: string;
  failureAnalysis?: string;
  mode: TradingMode;
  sl?: number;
  tp?: number;
}

export interface AnalysisResult {
  signal: 'CALL' | 'PUT' | 'BUY' | 'SELL' | 'NEUTRAL';
  confidence: number;
  reasoning: string;
  indicators: {
    rsi: string;
    trend: string;
    volatility: string;
    liquidity: string;
    volumeProfile: string;
    luxSignal: string;
    msgSignal: string;
    superTrend: string;
    smcBreaker: string;
    ictModel: string;
  };
  strategySuggestion: string;
  forexLevels?: {
    sl: number;
    tp: number;
  };
}

export enum AssetType {
  EURUSD = 'EUR/USD',
  GBPUSD = 'GBP/USD',
  USDJPY = 'USD/JPY',
  AUDUSD = 'AUD/USD',
  USDCAD = 'USD/CAD',
  USDCHF = 'USD/CHF',
  NZDUSD = 'NZD/USD',
  XAUUSD = 'XAU/USD',
  BTCUSD = 'BTC/USD',
  NAS100 = 'NAS100',
  US30 = 'US30'
}