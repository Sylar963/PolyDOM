import React from 'react';
import { Candle } from '../domain/types';

interface ChartPanelProps {
  symbol: string;
  data: Candle[];
}

export const ChartPanel: React.FC<ChartPanelProps> = ({ symbol, data }) => {
  return (
    <div className="flex flex-col w-full h-full bg-[#323232] text-[#d1d1d1] font-mono text-[11px] border-t border-[#444]">
      {/* Header */}
      <div className="flex items-center px-2 py-1 bg-[#2a2a2a] border-b border-[#444]">
        <span className="font-bold border-b-2 border-[#f57c00] pb-[1px] text-[#f57c00]">{symbol}</span>
      </div>
      
      {/* Chart Body */}
      <div className="flex-1 relative overflow-hidden flex">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[60px] font-bold text-[#ffffff05] whitespace-nowrap">{symbol}</span>
        </div>
        
        {/* Main Chart Area */}
        <div className="flex-1 relative border-r border-[#444]">
          {/* Grid lines (mock) */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-full h-[1px] bg-[#444] opacity-30"></div>
            ))}
          </div>
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-full w-[1px] bg-[#444] opacity-30"></div>
            ))}
          </div>
          
          {/* Candles (mock rendering) */}
          <div className="absolute inset-0 flex items-end px-4 gap-2">
            {data.map((candle, i) => {
              const height = Math.max((candle.high - candle.low) * 5, 2);
              const topOffset = (1974 - candle.high) * 5;
              const bodyHeight = Math.max(Math.abs(candle.open - candle.close) * 5, 2);
              const bodyTopOffset = (candle.high - Math.max(candle.open, candle.close)) * 5;
              
              return (
                <div key={i} className="relative flex flex-col items-center justify-end h-full w-[12px]">
                  {/* Candle */}
                  <div className="absolute w-full" style={{ top: `${topOffset + 20}px`, height: `${height}px` }}>
                    {/* Wick */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] h-full ${candle.isUp ? 'bg-[#4caf50]' : 'bg-[#e53935]'}`}></div>
                    {/* Body */}
                    <div className={`absolute w-full ${candle.isUp ? 'bg-[#4caf50]' : 'bg-[#e53935]'}`} style={{ top: `${bodyTopOffset}px`, height: `${bodyHeight}px` }}></div>
                  </div>
                  
                  {/* Volume Bar */}
                  <div className={`w-full opacity-50 ${candle.isUp ? 'bg-[#4caf50]' : 'bg-[#e53935]'}`} style={{ height: `${candle.volume / 4}px` }}></div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Y-Axis */}
        <div className="w-[60px] flex flex-col justify-between py-4 px-1 text-right text-[#aaa]">
          <span>1,974.00</span>
          <span>1,972.00</span>
          <span>1,970.00</span>
          <span>1,968.00</span>
          <span>1,966.00</span>
          <span>1,964.00</span>
          <span>1,962.00</span>
          <span>1,960.00</span>
        </div>
      </div>
      
      {/* X-Axis */}
      <div className="h-[20px] flex justify-between px-4 text-[#aaa] border-t border-[#444]">
        <span>12:10</span>
        <span>12:20</span>
        <span>12:30</span>
        <span>12:40</span>
        <span>12:50</span>
        <span>13:00</span>
        <span>13:10</span>
        <span>13:20</span>
        <span>13:30</span>
        <span>13:40</span>
        <span>13:50</span>
        <span>14:00</span>
        <span>14:10</span>
      </div>
    </div>
  );
};
