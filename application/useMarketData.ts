import { useState, useEffect } from 'react';
import { IMarketDataService } from '../domain/interfaces';
import { MarketData, Candle } from '../domain/types';
import { MockMarketDataService } from '../infrastructure/MockMarketDataService';

const marketDataService: IMarketDataService = new MockMarketDataService();

export function useMarketData(symbol: string) {
  const [data, setData] = useState<MarketData | null>(null);

  useEffect(() => {
    marketDataService.getMarketData(symbol).then(setData);
  }, [symbol]);

  return data;
}

export function useCandles(symbol: string, timeframe: string) {
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    marketDataService.getCandles(symbol, timeframe).then(setCandles);
  }, [symbol, timeframe]);

  return candles;
}
