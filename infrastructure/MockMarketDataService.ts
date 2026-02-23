import { IMarketDataService } from '../domain/interfaces';
import { MarketData, Candle } from '../domain/types';
import { ethUsdtSwapPrices, ethUsdtPrices, ethUsdtSwapCandles, ethUsdtSwapTicks, ethUsdtTicks } from './mockData';

export class MockMarketDataService implements IMarketDataService {
  async getMarketData(symbol: string): Promise<MarketData> {
    if (symbol === 'ETH-USDT-SWAP') {
      return { 
        symbol, 
        prices: ethUsdtSwapPrices, 
        ticks: ethUsdtSwapTicks,
        fp1Stats: { totalVolume: '2,815', delta: '-447', isDeltaPositive: true, time: '13:45' },
        fp2Stats: { totalVolume: '15,445', delta: '3,512', isDeltaPositive: false, time: '13:50' }
      };
    }
    if (symbol === 'ETH-USDT') {
      return { 
        symbol, 
        prices: ethUsdtPrices, 
        ticks: ethUsdtTicks,
        fp1Stats: { totalVolume: '4.5438', delta: '0.3016', isDeltaPositive: false, time: '13:45' },
        fp2Stats: { totalVolume: '40.9382', delta: '24.6424', isDeltaPositive: false, time: '13:50' }
      };
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
