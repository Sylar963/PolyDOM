import { IMarketDataService } from '../domain/interfaces';
import { MarketData, Candle, Tick, FootprintStats } from '../domain/types';

export class RealMarketDataService implements IMarketDataService {
  private btcTokenId: string | null = null;
  private initPromise: Promise<void> | null = null;

  async init() {
    if (this.initPromise) return this.initPromise;
    
    this.initPromise = (async () => {
      try {
        // Find an active BTC market with an orderbook
        const res = await fetch('/api/gamma/events?active=true&closed=false&limit=100&query=Bitcoin');
        const events = await res.json();
        const btcEvents = events.filter((e: any) => e.title.includes('Bitcoin') || e.description.includes('Bitcoin'));
        
        for (const e of btcEvents) {
          for (const m of e.markets) {
            if (m.enableOrderBook && m.clobTokenIds) {
              const tokenIds = JSON.parse(m.clobTokenIds);
              const bookRes = await fetch(`/api/clob/book?token_id=${tokenIds[0]}`);
              const book = await bookRes.json();
              if (!book.error) {
                this.btcTokenId = tokenIds[0]; // Get the 'Yes' token ID
                console.log('Found BTC Market:', m.question, 'Token ID:', this.btcTokenId);
                return;
              }
            }
          }
        }
      } catch (e) {
        console.error('Failed to init RealMarketDataService', e);
      }
    })();
    
    return this.initPromise;
  }

  async getMarketData(symbol: string): Promise<MarketData> {
    if (!this.btcTokenId) {
      await this.init();
    }

    if (!this.btcTokenId) {
      throw new Error('No BTC market found');
    }

    const res = await fetch(`/api/clob/book?token_id=${this.btcTokenId}`);
    const book = await res.json();

    // Map orderbook to our domain types
    const asks = book.asks.map((a: any) => ({
      p: parseFloat(a.price).toFixed(2),
      s: parseFloat(a.size).toFixed(2),
      isAsk: true,
      bar: Math.min(100, (parseFloat(a.size) / 1000) * 100),
      fp1: { volume: (parseFloat(a.size) * 0.4).toFixed(2), active: false },
      fp2: { volume: (parseFloat(a.size) * 0.2).toFixed(2), active: false }
    })).sort((a: any, b: any) => parseFloat(b.p) - parseFloat(a.p)).slice(-15); // Top 15 asks

    const bids = book.bids.map((b: any) => ({
      p: parseFloat(b.price).toFixed(2),
      s: parseFloat(b.size).toFixed(2),
      isBid: true,
      bar: Math.min(100, (parseFloat(b.size) / 1000) * 100),
      fp1: { volume: (parseFloat(b.size) * 0.5).toFixed(2), active: false },
      fp2: { volume: (parseFloat(b.size) * 0.3).toFixed(2), active: false }
    })).sort((a: any, b: any) => parseFloat(b.p) - parseFloat(a.p)).slice(0, 15); // Top 15 bids

    const prices = [...asks, ...bids];

    // Generate some mock ticks based on current prices for the tick chart
    const ticks: Tick[] = [];
    if (prices.length > 0) {
      const midPriceIndex = Math.floor(prices.length / 2);
      for (let i = 0; i < 10; i++) {
        const isBuy = Math.random() > 0.5;
        const offset = Math.floor(Math.random() * 5) - 2;
        const targetIndex = Math.max(0, Math.min(prices.length - 1, midPriceIndex + offset));
        ticks.push({
          price: prices[targetIndex].p,
          size: (Math.random() * 100).toFixed(2),
          isBuy,
          time: Date.now() - (10 - i) * 1000
        });
      }
    }

    return {
      symbol,
      prices,
      ticks,
      fp1Stats: {
        totalVolume: '40.93',
        delta: '-12.4',
        isDeltaPositive: false,
        time: '15m'
      },
      fp2Stats: {
        totalVolume: '85.20',
        delta: '5.1',
        isDeltaPositive: true,
        time: '15m'
      }
    };
  }

  async getCandles(symbol: string, timeframe: string): Promise<Candle[]> {
    if (!this.btcTokenId) {
      await this.init();
    }

    if (!this.btcTokenId) {
      return [];
    }

    // Fetch price history from CLOB API
    try {
      const res = await fetch(`/api/clob/prices-history?interval=1m&market=${this.btcTokenId}&fidelity=10`);
      const data = await res.json();
      
      if (data && data.history) {
        return data.history.map((h: any) => {
          return {
            time: h.t.toString(),
            open: h.o,
            high: h.h,
            low: h.l,
            close: h.c,
            volume: Math.random() * 1000, // Mock volume since API doesn't provide it
            isUp: h.c >= h.o
          };
        });
      }
    } catch (e) {
      console.error('Failed to fetch candles', e);
    }

    return [];
  }

  async getTicks(symbol: string): Promise<Tick[]> {
    return [];
  }
}
