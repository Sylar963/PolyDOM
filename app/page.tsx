'use client';

import React from 'react';
import { BarChart2, Settings, Eye } from 'lucide-react';
import { useMarketData, useCandles } from '../application/useMarketData';
import { PriceLevel, Tick } from '../domain/types';
import { TradingChart } from '../components/TradingChart';

const TickChartOverlay = ({ ticks, prices, width, left }: { ticks: Tick[], prices: PriceLevel[], width: number, left: number }) => {
  if (!ticks || ticks.length === 0) return null;

  const rowHeight = 16;
  
  // Map prices to row indices
  const priceToIndex = new Map<string, number>();
  prices.forEach((p, i) => priceToIndex.set(p.p, i));

  // Calculate coordinates
  const points = ticks.map((tick, i) => {
    const rowIndex = priceToIndex.get(tick.price);
    if (rowIndex === undefined) return null;
    
    const y = rowIndex * rowHeight + (rowHeight / 2);
    // Distribute X coordinates evenly
    const xStep = width / (ticks.length + 1);
    const x = (i + 1) * xStep;
    
    return { x, y, tick };
  }).filter(p => p !== null) as { x: number, y: number, tick: Tick }[];

  if (points.length === 0) return null;

  // Generate path string
  const pathD = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

  return (
    <div className="absolute top-0 pointer-events-none" style={{ width: `${width}px`, left: `${left}px`, height: `${prices.length * rowHeight}px` }}>
      <svg width={width} height={prices.length * rowHeight} className="absolute top-0 left-0 overflow-visible">
        {/* Connecting line */}
        <path d={pathD} fill="none" stroke="#888" strokeWidth="1" opacity="0.5" />
        
        {/* Bubbles */}
        {points.map((p, i) => (
          <g key={i} transform={`translate(${p.x}, ${p.y})`}>
            <circle r="7" fill={p.tick.isBuy ? '#4caf50' : '#e53935'} />
            <text x="0" y="3" fontSize="9" fill="white" textAnchor="middle" fontFamily="monospace">
              {p.tick.size}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default function PolymarketTerminal() {
  const btcSwapData = useMarketData('BTC-USD-SWAP');
  const btcData = useMarketData('BTC-USD');
  const candles = useCandles('BTC-USD-SWAP', '1m');
  const [viewMode, setViewMode] = React.useState<'shares' | 'money'>('shares');

  if (!btcSwapData || !btcData) {
    return <div className="flex h-screen items-center justify-center bg-[#1e1e1e] text-white">Loading market data...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#d1d1d1] font-mono text-[11px] overflow-hidden">
      {/* Top Section: DOM Panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left DOM: BTC-USD-SWAP */}
        <div className="flex flex-col flex-1 border-r border-[#444] border-b border-[#444] bg-[#222]">
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-1 bg-[#2a2a2a] border-b border-[#444]">
            <span className="font-bold border-b-2 border-[#f57c00] pb-[1px] text-[#f57c00]">BTC-USD-SWAP</span>
            <button 
              onClick={() => setViewMode(v => v === 'shares' ? 'money' : 'shares')}
              className="text-[9px] bg-[#333] hover:bg-[#444] px-2 py-0.5 rounded border border-[#555] text-[#aaa]"
            >
              Toggle {viewMode === 'shares' ? 'Money' : 'Shares'}
            </button>
          </div>
          
          {/* Body */}
          <div className="flex-1 relative overflow-hidden flex">
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
                <div className="bg-[#2d5a40] w-full text-center py-[2px] cursor-pointer text-[#81c784] font-bold" title="First In First Out">F</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a] font-bold" title="Current Leverage">L</div>
                <div className="bg-[#2b5c8f] border border-[#5fa8d3] w-full text-center py-[2px] cursor-pointer text-white" title="Size Hotkey">0.01</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a]" title="Size Hotkey">0.02</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a]" title="Size Hotkey">0.03</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a]" title="Size Hotkey">0.04</div>
                <div className="w-full text-center py-[2px] cursor-pointer hover:bg-[#3a3a3a]" title="Size Hotkey">0.05</div>
              </div>
            </div>

            {/* Scrollable Rows */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative select-none flex flex-col">
              {btcSwapData.ticks && (
                <TickChartOverlay ticks={btcSwapData.ticks} prices={btcSwapData.prices} width={100} left={126} />
              )}
              {btcSwapData.prices.map((row, i) => (
                <div key={i} className={`flex h-[16px] leading-[16px] ${row.isAsk ? 'bg-[#5c3131]' : row.isBid ? 'bg-[#2d5a40]' : 'hover:bg-[#3a3a3a]'}`}>
                  {/* Footprint 1 */}
                  <div className="w-[45px] border-r border-[#444] flex items-center justify-end px-1">
                    {row.fp1 && (
                      <div className={`w-full text-right px-1 ${row.fp1.active ? 'bg-[#2b5c8f] text-white border border-[#5fa8d3]' : 'text-[#aaa]'}`}>
                        {viewMode === 'money' ? `$${(parseFloat(row.fp1.volume.replace(/,/g, '')) * parseFloat(row.p.replace(/,/g, ''))).toFixed(0)}` : row.fp1.volume}
                      </div>
                    )}
                  </div>
                  {/* Footprint 2 */}
                  <div className="w-[45px] border-r border-[#444] flex items-center justify-end px-1">
                    {row.fp2 && (
                      <div className={`w-full text-right px-1 ${row.fp2.active ? 'bg-[#2b5c8f] text-white border border-[#5fa8d3]' : 'text-[#aaa]'}`}>
                        {viewMode === 'money' ? `$${(parseFloat(row.fp2.volume.replace(/,/g, '')) * parseFloat(row.p.replace(/,/g, ''))).toFixed(0)}` : row.fp2.volume}
                      </div>
                    )}
                  </div>
                  {/* Controls Space */}
                  <div className="w-[36px] border-r border-[#444]"></div>
                  {/* Bubbles Area (Empty for overlay) */}
                  <div className="w-[100px] relative flex items-center justify-end pr-1">
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
          </div>
          
          {/* Footer */}
          <div className="flex bg-[#2a2a2a] border-t border-[#444] h-[45px] items-center px-1 text-[10px]">
             <div className="flex flex-col w-[45px] text-right pr-1">
               <span className="text-[#aaa]">{btcSwapData.fp1Stats?.totalVolume}</span>
               <span className={btcSwapData.fp1Stats?.isDeltaPositive ? 'text-[#4caf50]' : 'text-[#e53935]'}>{btcSwapData.fp1Stats?.delta}</span>
               <span className="text-[#aaa]">{btcSwapData.fp1Stats?.time}</span>
             </div>
             <div className="flex flex-col w-[45px] text-right pr-1">
               <span className="text-[#aaa]">{btcSwapData.fp2Stats?.totalVolume}</span>
               <span className={btcSwapData.fp2Stats?.isDeltaPositive ? 'text-[#4caf50]' : 'text-[#e53935]'}>{btcSwapData.fp2Stats?.delta}</span>
               <span className="text-[#aaa]">{btcSwapData.fp2Stats?.time}</span>
             </div>
             <div className="flex flex-col w-[36px] items-center text-[#aaa]">
               <span>-</span>
               <span>-</span>
               <span>-</span>
             </div>
             <div className="flex flex-col w-[100px] items-center text-[#aaa]">
               <span>-</span>
               <span>-</span>
               <span>-</span>
             </div>
             <div className="flex flex-col w-[60px] items-center text-[#aaa]">
               <span>-</span>
               <span>-</span>
               <span>-</span>
             </div>
          </div>
        </div>

        {/* Right DOM: BTC-USD */}
        <div className="flex flex-col flex-1 border-b border-[#444] bg-[#222]">
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-1 bg-[#2a2a2a] border-b border-[#444]">
            <span className="font-bold border-b-2 border-[#f57c00] pb-[1px] text-[#f57c00]">BTC-USD</span>
            <button 
              onClick={() => setViewMode(v => v === 'shares' ? 'money' : 'shares')}
              className="text-[9px] bg-[#333] hover:bg-[#444] px-2 py-0.5 rounded border border-[#555] text-[#aaa]"
            >
              Toggle {viewMode === 'shares' ? 'Money' : 'Shares'}
            </button>
          </div>
          
          {/* Body */}
          <div className="flex-1 relative overflow-hidden flex">
            {/* Scrollable Rows */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative select-none flex flex-col">
              {btcData.ticks && (
                <TickChartOverlay ticks={btcData.ticks} prices={btcData.prices} width={120} left={100} />
              )}
              {btcData.prices.map((row, i) => (
                <div key={i} className={`flex h-[16px] leading-[16px] ${row.isAsk ? 'bg-[#5c3131]' : row.isBid ? 'bg-[#2d5a40]' : 'hover:bg-[#3a3a3a]'}`}>
                  {/* Footprint 1 */}
                  <div className="w-[50px] border-r border-[#444] flex items-center justify-end px-1">
                    {row.fp1 && (
                      <div className={`w-full text-right px-1 ${row.fp1.active ? 'bg-[#2b5c8f] text-white border border-[#5fa8d3]' : 'text-[#aaa]'}`}>
                        {viewMode === 'money' ? `$${(parseFloat(row.fp1.volume.replace(/,/g, '')) * parseFloat(row.p.replace(/,/g, ''))).toFixed(0)}` : row.fp1.volume}
                      </div>
                    )}
                  </div>
                  {/* Footprint 2 */}
                  <div className="w-[50px] border-r border-[#444] flex items-center justify-end px-1">
                    {row.fp2 && (
                      <div className={`w-full text-right px-1 ${row.fp2.active ? 'bg-[#2b5c8f] text-white border border-[#5fa8d3]' : 'text-[#aaa]'}`}>
                        {viewMode === 'money' ? `$${(parseFloat(row.fp2.volume.replace(/,/g, '')) * parseFloat(row.p.replace(/,/g, ''))).toFixed(0)}` : row.fp2.volume}
                      </div>
                    )}
                  </div>
                  {/* Bubbles Area (Empty for overlay) */}
                  <div className="w-[120px] relative flex items-center justify-start pl-1">
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
          </div>
          
          {/* Footer */}
          <div className="flex bg-[#2a2a2a] border-t border-[#444] h-[45px] items-center px-1 text-[10px]">
             <div className="flex flex-col w-[50px] text-right pr-1">
               <span className="text-[#aaa]">{btcData.fp1Stats?.totalVolume}</span>
               <span className={btcData.fp1Stats?.isDeltaPositive ? 'text-[#4caf50]' : 'text-[#e53935]'}>{btcData.fp1Stats?.delta}</span>
               <span className="text-[#aaa]">{btcData.fp1Stats?.time}</span>
             </div>
             <div className="flex flex-col w-[50px] text-right pr-1">
               <span className="text-[#aaa]">{btcData.fp2Stats?.totalVolume}</span>
               <span className={btcData.fp2Stats?.isDeltaPositive ? 'text-[#4caf50]' : 'text-[#e53935]'}>{btcData.fp2Stats?.delta}</span>
               <span className="text-[#aaa]">{btcData.fp2Stats?.time}</span>
             </div>
             <div className="flex items-center justify-center w-[120px]">
                <div className="border border-[#5fa8d3] bg-[#2b5c8f] text-white px-1">0.0001</div>
             </div>
             <div className="flex flex-col flex-1 items-center text-[#aaa]">
               <span>-</span>
               <span>-</span>
               <span>-</span>
             </div>
             <div className="flex flex-col w-[60px] items-center text-[#aaa]">
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
          <span className="font-bold border-b-2 border-[#f57c00] pb-[1px] text-[#f57c00]">BTC-USD-SWAP, 1m</span>
        </div>
        
        {/* Chart Body */}
        <div className="flex-1 relative overflow-hidden">
          <TradingChart data={candles} symbol="BTC-USD-SWAP, 1m" />
        </div>
      </div>
    </div>
  );
}
