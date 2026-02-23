'use client';

import { useEffect, useState } from 'react';

export default function Test() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch('https://gamma-api.polymarket.com/markets?active=true&limit=100')
      .then(r => r.json())
      .then(d => {
        const btc = d.filter((m: any) => m.question.includes('BTC') || m.question.includes('Bitcoin'));
        setData(btc.map((m: any) => ({ q: m.question, tokens: m.clobTokenIds })));
      });
  }, []);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
