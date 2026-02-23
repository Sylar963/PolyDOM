import { MarketData, Candle } from './types';

export interface IMarketDataService {
  getMarketData(symbol: string): Promise<MarketData>;
  getCandles(symbol: string, timeframe: string): Promise<Candle[]>;
}
