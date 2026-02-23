import React from 'react';
import { MarketData, PriceLevel } from '../domain/types';

export interface ColumnDef {
  width: number;
  className?: string;
  render: (row: PriceLevel) => React.ReactNode;
}

interface DOMPanelProps {
  symbol: string;
  data: MarketData;
  isActive?: boolean;
  columns: ColumnDef[];
  footer: React.ReactNode;
}

export const DOMPanel: React.FC<DOMPanelProps> = ({ symbol, data, isActive, columns, footer }) => {
  return (
    <div className={`flex flex-col flex-1 bg-[#323232] text-[#d1d1d1] font-mono text-[11px] ${isActive ? 'border border-[#3b82f6]' : 'border-r border-[#444]'}`}>
      {/* Header */}
      <div className="flex items-center px-2 py-1 bg-[#2a2a2a] border-b border-[#444]">
        <span className="font-bold border-b-2 border-[#f57c00] pb-[1px] text-[#f57c00]">{symbol}</span>
      </div>
      
      {/* Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative select-none">
        {data.prices.map((row, i) => (
          <div key={i} className={`flex h-[16px] leading-[16px] ${row.isAsk ? 'bg-[#5c3131]' : row.isBid ? 'bg-[#2d5a40]' : 'hover:bg-[#3a3a3a]'}`}>
            {columns.map((col, j) => (
              <div key={j} style={{ width: col.width }} className={`relative ${col.className || ''}`}>
                {col.render(row)}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="flex bg-[#2a2a2a] border-t border-[#444] text-[10px] h-[45px] items-center px-1">
        {footer}
      </div>
    </div>
  );
};
