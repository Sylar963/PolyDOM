import { IMarketDataService } from '../domain/interfaces';
import { MarketData, Candle } from '../domain/types';
import { ethUsdtSwapPrices, ethUsdtPrices, ethUsdtSwapCandles } from './mockData';

export class MockMarketDataService implements IMarketDataService {
  async getMarketData(symbol: string): Promise<MarketData> {
    if (symbol === 'ETH-USDT-SWAP') {
      return { symbol, prices: ethUsdtSwapPrices };
    }
    if (symbol === 'ETH-USDT') {
      return { symbol, prices: ethUsdtPrices };
    }
    throw new Error('Symbol not found');
  }

  async getCandles(symbol: string, timeframe: string): Promise<Candle[]> {
    if (symbol === 'ETH-USDT-SWAP' && timeframe === '5m') {
      return ethUsdtSwapCandles;
    }
    return [];
  }
}
