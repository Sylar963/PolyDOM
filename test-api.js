const fetch = require('node-fetch');
async function test() {
  try {
    const res = await fetch('https://gamma-api.polymarket.com/events?active=true&closed=false&limit=10&query=Bitcoin');
    const events = await res.json();
    console.log(events.length);
  } catch (e) {
    console.error(e);
  }
}
test();
