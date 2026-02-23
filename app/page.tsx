'use client';

import React from 'react';
import { BarChart2, Settings, Eye } from 'lucide-react';
import { useMarketData, useCandles } from '../application/useMarketData';
import { PriceLevel } from '../domain/types';

export default function PolymarketTerminal() {
  const ethUsdtSwapData = useMarketData('ETH-USDT-SWAP');
  const ethUsdtData = useMarketData('ETH-USDT');
  const candles = useCandles('ETH-USDT-SWAP', '5m');

  if (!ethUsdtSwapData || !ethUsdtData) {
    return <div className="flex h-screen items-center justify-center bg-[#1e1e1e] text-white">Loading market data...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#d1d1d1] font-mono text-[11px] overflow-hidden">
      {/* Top Section: DOM Panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left DOM: ETH-USDT-SWAP */}
        <div className="flex flex-col flex-1 border-r border-[#444] border-b border-[#444] bg-[#222]">
          {/* Header */}
          <div className="flex items-center px-2 py-1 bg-[#2a2a2a] border-b border-[#444]">
            <span className="font-bold border-b-2 border-[#f57c00] pb-[1px] text-[#f57c00]">ETH-USDT-SWAP</span>
          </div>
          
          {/* Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative select-none flex flex-col">
            {/* Static Control Column Overlay */}
            <div className="absolute top-0 bottom-0 left-[90px] w-[36px] flex flex-col justify-between pointer-events-none z-20 py-2 border-r border-[#444] bg-[#222]">
              {/* Top controls */}
              <div className="flex flex-col items-center gap-3 pointer-events-auto text-[#aaa]">
                <div className="flex w-full justify-around px-1">
                  <BarChart2 size={12} className="cursor-pointer hover:text-white" />
                  <Settings size={12} className="cursor-pointer hover:text-white" />
                </div>
                <div className="flex w-full justify-around px-1">
                  <div className="text-[10px] font-bold cursor-pointer hover:text-white">L</div>
                  <Eye size={12} className="cursor-pointer hover:text-white" />
                </div>
                <div className="text-[10px] cursor-pointer hover:text-white">x20</div>
              </div>
              
              {/* Bottom controls */}
              <div className="flex flex-col items-center gap-[4px] pb-12 pointer-events-auto text-[#aaa] w-full text-[10px]">
                <div className="bg-[#2d5a40] w-full text-center py-[2px] cursor-pointer text-[#81c784] font-bold">F</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a] font-bold">L</div>
                <div className="bg-[#2b5c8f] border border-[#5fa8d3] w-full text-center py-[2px] cursor-pointer text-white">0.01</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a]">0.02</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a]">0.03</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a]">0.04</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a]">0.05</div>
              </div>
            </div>

            {ethUsdtSwapData.prices.map((row, i) => (
              <div key={i} className={`flex h-[16px] leading-[16px] ${row.isAsk ? 'bg-[#5c3131]' : row.isBid ? 'bg-[#2d5a40]' : 'hover:bg-[#3a3a3a]'}`}>
                {/* Working Order 1 */}
                <div className="w-[45px] border-r border-[#444] flex items-center justify-end px-1">
                  {row.wo1 && (
                    <div className={`w-full text-right px-1 ${row.wo1.active ? 'bg-[#2b5c8f] text-white border border-[#5fa8d3]' : 'text-[#aaa]'}`}>
                      {row.wo1.size}
                    </div>
                  )}
                </div>
                {/* Working Order 2 */}
                <div className="w-[45px] border-r border-[#444] flex items-center justify-end px-1">
                  {row.wo2 && (
                    <div className={`w-full text-right px-1 ${row.wo2.active ? 'bg-[#2b5c8f] text-white border border-[#5fa8d3]' : 'text-[#aaa]'}`}>
                      {row.wo2.size}
                    </div>
                  )}
                </div>
                {/* Controls Space */}
                <div className="w-[36px] border-r border-[#444]"></div>
                {/* Bubbles Area */}
                <div className="w-[100px] relative flex items-center justify-end pr-1">
                  {row.bubbles && row.bubbles.map((b, idx) => (
                    <div key={idx} className={`rounded-full flex items-center justify-center text-[9px] text-white mx-[1px] ${b.isBuy ? 'bg-[#4caf50]' : 'bg-[#e53935]'}`} style={{ width: '14px', height: '14px' }}>
                      {b.size}
                    </div>
                  ))}
                </div>
                {/* Size */}
                <div className="w-[60px] text-right px-1 relative flex items-center justify-end">
                  <div className={`absolute right-0 top-[1px] bottom-[1px] opacity-30 ${row.isAsk ? 'bg-[#e53935]' : row.isBid ? 'bg-[#4caf50]' : 'bg-[#f57c00]'}`} style={{ width: `${row.bar}%` }}></div>
                  <span className={`relative z-10 ${row.h ? 'text-[#f57c00]' : ''}`}>{row.s}</span>
                </div>
                {/* Price */}
                <div className="w-[60px] text-right px-1 border-l border-[#444] bg-[#2a2a2a]">
                  {row.p}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="flex bg-[#2a2a2a] border-t border-[#444] h-[45px] items-center px-1 text-[10px]">
             <div className="flex flex-col w-[60px]">
               <span className="text-[#aaa]">2,815</span>
               <span className="text-[#4caf50]">-447</span>
               <span className="text-[#aaa]">13:45</span>
             </div>
             <div className="flex flex-col w-[60px]">
               <span className="text-[#aaa]">15,445</span>
               <span className="text-[#e53935]">3,512</span>
               <span className="text-[#aaa]">13:50</span>
             </div>
             <div className="flex flex-col w-[30px] items-center text-[#aaa]">
               <span>-</span>
               <span>-</span>
               <span>-</span>
             </div>
             <div className="flex flex-col w-[30px] items-center text-[#aaa]">
               <span>-</span>
               <span>-</span>
               <span>-</span>
             </div>
             <div className="flex flex-col w-[30px] items-center text-[#aaa]">
               <span>-</span>
               <span>-</span>
               <span>-</span>
             </div>
          </div>
        </div>

        {/* Right DOM: ETH-USDT */}
        <div className="flex flex-col flex-1 border-b border-[#444] bg-[#222]">
          {/* Header */}
          <div className="flex items-center px-2 py-1 bg-[#2a2a2a] border-b border-[#444]">
            <span className="font-bold border-b-2 border-[#f57c00] pb-[1px] text-[#f57c00]">ETH-USDT</span>
          </div>
          
          {/* Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative select-none flex flex-col">
            {ethUsdtData.prices.map((row, i) => (
              <div key={i} className={`flex h-[16px] leading-[16px] ${row.isAsk ? 'bg-[#5c3131]' : row.isBid ? 'bg-[#2d5a40]' : 'hover:bg-[#3a3a3a]'}`}>
                {/* Working Order 1 */}
                <div className="w-[50px] border-r border-[#444] flex items-center justify-end px-1">
                  {row.wo1 && (
                    <div className={`w-full text-right px-1 ${row.wo1.active ? 'bg-[#2b5c8f] text-white border border-[#5fa8d3]' : 'text-[#aaa]'}`}>
                      {row.wo1.size}
                    </div>
                  )}
                </div>
                {/* Working Order 2 */}
                <div className="w-[50px] border-r border-[#444] flex items-center justify-end px-1">
                  {row.wo2 && (
                    <div className={`w-full text-right px-1 ${row.wo2.active ? 'bg-[#2b5c8f] text-white border border-[#5fa8d3]' : 'text-[#aaa]'}`}>
                      {row.wo2.size}
                    </div>
                  )}
                </div>
                {/* Bubbles Area */}
                <div className="w-[120px] relative flex items-center justify-start pl-1">
                  {row.bubbles && row.bubbles.map((b, idx) => (
                    <div key={idx} className={`rounded-full flex items-center justify-center text-[9px] text-white mx-[1px] ${b.isBuy ? 'bg-[#4caf50]' : 'bg-[#e53935]'}`} style={{ width: 'auto', padding: '0 4px', height: '14px' }}>
                      {b.size}
                    </div>
                  ))}
                </div>
                {/* Size */}
                <div className="flex-1 text-right px-1 relative flex items-center justify-end">
                  <div className={`absolute right-0 top-[1px] bottom-[1px] opacity-30 ${row.isAsk ? 'bg-[#e53935]' : row.isBid ? 'bg-[#4caf50]' : 'bg-[#f57c00]'}`} style={{ width: `${row.bar}%` }}></div>
                  <span className={`relative z-10 ${row.h ? 'text-[#f57c00]' : ''}`}>{row.s}</span>
                </div>
                {/* Price */}
                <div className="w-[60px] text-right px-1 border-l border-[#444] bg-[#2a2a2a]">
                  {row.p}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="flex bg-[#2a2a2a] border-t border-[#444] h-[45px] items-center px-1 text-[10px]">
             <div className="flex flex-col w-[60px]">
               <span className="text-[#aaa]">4.5438</span>
               <span className="text-[#e53935]">0.3016</span>
               <span className="text-[#aaa]">13:45</span>
             </div>
             <div className="flex flex-col w-[60px]">
               <span className="text-[#aaa]">40.9382</span>
               <span className="text-[#e53935]">24.6424</span>
               <span className="text-[#aaa]">13:50</span>
             </div>
             <div className="flex items-center justify-center w-[50px]">
                <div className="border border-[#5fa8d3] bg-[#2b5c8f] text-white px-1">0.0001</div>
             </div>
             <div className="flex flex-col w-[30px] items-center text-[#aaa]">
               <span>-</span>
               <span>-</span>
               <span>-</span>
             </div>
             <div className="flex flex-col w-[30px] items-center text-[#aaa]">
               <span>-</span>
               <span>-</span>
               <span>-</span>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Chart */}
      <div className="h-[250px] flex flex-col bg-[#222]">
        {/* Header */}
        <div className="flex items-center px-2 py-1 bg-[#2a2a2a] border-b border-[#444]">
          <span className="font-bold border-b-2 border-[#f57c00] pb-[1px] text-[#f57c00]">ETH-USDT-SWAP, 5m</span>
        </div>
        
        {/* Chart Body */}
        <div className="flex-1 relative overflow-hidden flex">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[40px] font-bold text-[#ffffff05] whitespace-nowrap">ETH-USDT-SWAP, 5m</span>
          </div>
          
          {/* Main Chart Area */}
          <div className="flex-1 relative border-r border-[#444]">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-[#444] opacity-30"></div>
              ))}
            </div>
            <div className="absolute inset-0 flex justify-between pointer-events-none px-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-full w-[1px] bg-[#444] opacity-30"></div>
              ))}
            </div>
            
            {/* Current Price Line */}
            <div className="absolute w-full h-[1px] bg-[#e53935] opacity-50" style={{ top: '40px' }}></div>
            
            {/* Candles */}
            <div className="absolute inset-0 flex items-end px-4 gap-4 pb-[20px]">
              {candles.map((candle, i) => {
                const maxPrice = 1974;
                const minPrice = 1960;
                const priceRange = maxPrice - minPrice;
                const chartHeight = 180; // approximate height
                
                const topOffset = ((maxPrice - candle.high) / priceRange) * chartHeight;
                const height = Math.max(((candle.high - candle.low) / priceRange) * chartHeight, 1);
                
                const bodyTopOffset = ((candle.high - Math.max(candle.open, candle.close)) / priceRange) * chartHeight;
                const bodyHeight = Math.max((Math.abs(candle.open - candle.close) / priceRange) * chartHeight, 2);
                
                return (
                  <div key={i} className="relative flex flex-col items-center justify-end h-full w-[14px]">
                    {/* Candle */}
                    <div className="absolute w-full" style={{ top: `${topOffset}px`, height: `${height}px` }}>
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
          <div className="w-[60px] flex flex-col justify-between py-4 px-1 text-right text-[#aaa] bg-[#2a2a2a]">
            <span>1,974.00</span>
            <span className="text-[#e53935] bg-[#5c3131] px-1">1,972.74</span>
            <span>1,972.00</span>
            <span>1,971.00</span>
            <span>1,970.00</span>
            <span>1,969.00</span>
            <span>1,968.00</span>
            <span>1,967.00</span>
            <span>1,966.00</span>
            <span>1,965.00</span>
            <span>1,964.00</span>
            <span>1,963.00</span>
            <span>1,962.00</span>
            <span>1,961.00</span>
            <span>1,960.00</span>
          </div>
        </div>
        
        {/* X-Axis */}
        <div className="h-[20px] flex justify-between px-4 text-[#aaa] border-t border-[#444] bg-[#2a2a2a]">
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
    </div>
  );
}
