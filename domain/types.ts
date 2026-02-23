export interface Footprint {
  volume: string;
  active: boolean;
}

export interface FootprintStats {
  totalVolume: string;
  delta: string;
  isDeltaPositive: boolean;
  time: string;
}

export interface PriceLevel {
  p: string; // price
  s: string; // size
  isBid?: boolean;
  isAsk?: boolean;
  h?: boolean; // highlight (yellow text)
  bar: number; // percentage for background volume bar
  fp1?: Footprint; // footprint column 1
  fp2?: Footprint; // footprint column 2
}

export interface Tick {
  price: string;
  size: string;
  isBuy: boolean;
  time: number; // timestamp or relative X position
}

export interface MarketData {
  symbol: string;
  prices: PriceLevel[];
  ticks?: Tick[];
  fp1Stats?: FootprintStats;
  fp2Stats?: FootprintStats;
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isUp: boolean;
}
