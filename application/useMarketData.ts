import { useState, useEffect } from 'react';
import { IMarketDataService } from '../domain/interfaces';
import { MarketData, Candle } from '../domain/types';
import { RealMarketDataService } from '../infrastructure/RealMarketDataService';

const marketDataService: IMarketDataService = new RealMarketDataService();

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
