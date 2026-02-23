export interface PriceLevel {
  p: string; // price
  s: string; // size
  isBid?: boolean;
  isAsk?: boolean;
  h?: boolean; // highlight (yellow text)
  bar: number; // percentage for background volume bar
  wo1?: { size: string; active: boolean }; // working order column 1
  wo2?: { size: string; active: boolean }; // working order column 2
  bubbles?: { size: string; isBuy: boolean }[]; // trade bubbles
}

export interface MarketData {
  symbol: string;
  prices: PriceLevel[];
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
