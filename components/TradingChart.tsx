import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, Time, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import { Candle } from '../domain/types';

interface TradingChartProps {
  data: Candle[];
  symbol: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ data, symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#aaaaaa',
      },
      grid: {
        vertLines: { color: '#333333', style: 1 },
        horzLines: { color: '#333333', style: 1 },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#444444',
      },
      rightPriceScale: {
        borderColor: '#444444',
        autoScale: true,
      },
      crosshair: {
        mode: 1, // Normal mode
        vertLine: {
          color: '#888888',
          width: 1,
          style: 3, // Dashed
          labelBackgroundColor: '#444444',
        },
        horzLine: {
          color: '#888888',
          width: 1,
          style: 3, // Dashed
          labelBackgroundColor: '#444444',
        },
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#4caf50',
      downColor: '#e53935',
      borderVisible: false,
      wickUpColor: '#4caf50',
      wickDownColor: '#e53935',
    });
    seriesRef.current = candlestickSeries;

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // set as an overlay
    });
    
    chart.priceScale('').applyOptions({
      scaleMargins: {
        top: 0.8, // highest point of the series will be at 80% of the chart height
        bottom: 0,
      },
    });
    volumeSeriesRef.current = volumeSeries;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !volumeSeriesRef.current || !data || data.length === 0) return;

    // Convert data to lightweight-charts format
    const chartData = data.map(d => {
      const timestamp = parseInt(d.time) as Time;
      
      return {
        time: timestamp,
        open: Number(d.open),
        high: Number(d.high),
        low: Number(d.low),
        close: Number(d.close),
        volume: Number(d.volume),
        isUp: d.isUp
      };
    }).filter(d => 
      !isNaN(d.open) && !isNaN(d.high) && !isNaN(d.low) && !isNaN(d.close) && !isNaN(d.time as number)
    );

    // Sort data by time
    chartData.sort((a, b) => (a.time as number) - (b.time as number));

    // Remove duplicates
    const uniqueChartData = chartData.filter((d, index, self) => 
      index === 0 || d.time !== self[index - 1].time
    );

    if (uniqueChartData.length > 0) {
      seriesRef.current.setData(uniqueChartData.map(d => ({
        time: d.time,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      })));

      volumeSeriesRef.current.setData(uniqueChartData.map(d => ({
        time: d.time,
        value: d.volume,
        color: d.isUp ? 'rgba(76, 175, 80, 0.5)' : 'rgba(229, 57, 53, 0.5)',
      })));

      // Set the last price line to be red like in the image
      const lastClose = uniqueChartData[uniqueChartData.length - 1].close;
      if (typeof lastClose === 'number' && !isNaN(lastClose)) {
        seriesRef.current.createPriceLine({
          price: lastClose,
          color: '#e53935',
          lineWidth: 1,
          lineStyle: 0,
          axisLabelVisible: true,
          title: '',
        });
      }
    }

  }, [data]);

  return (
    <div className="relative w-full h-full bg-[#222]">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[60px] font-bold text-[#ffffff05] whitespace-nowrap">{symbol}</span>
      </div>
      <div ref={chartContainerRef} className="absolute inset-0 z-10" />
    </div>
  );
};
