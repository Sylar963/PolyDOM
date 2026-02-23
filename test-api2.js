const fetch = require('node-fetch');
async function test() {
  try {
    const res = await fetch('https://gamma-api.polymarket.com/events?active=true&closed=false&limit=10&query=Bitcoin');
    const events = await res.json();
    const btcEvent = events.find((e) => e.title.includes('Bitcoin') || e.description.includes('Bitcoin'));
    console.log(btcEvent ? Object.keys(btcEvent) : 'Not found');
    if (btcEvent) {
      console.log('Markets length:', btcEvent.markets ? btcEvent.markets.length : 'undefined');
      if (btcEvent.markets && btcEvent.markets.length > 0) {
        console.log('clobTokenIds:', btcEvent.markets[0].clobTokenIds);
      }
    }
  } catch (e) {
    console.error(e);
  }
}
test();
