import { PriceLevel, Candle } from '../domain/types';

export const ethUsdtSwapPrices: PriceLevel[] = [
  { p: '1,976.8', s: '3,244', h: false, bar: 10 },
  { p: '1,976.6', s: '8,094', h: false, bar: 25 },
  { p: '1,976.4', s: '2,684', h: false, bar: 8 },
  { p: '1,976.2', s: '4,062', h: false, bar: 12 },
  { p: '1,976.0', s: '21,867', h: true, bar: 65 },
  { p: '1,975.8', s: '3,257', h: false, bar: 10 },
  { p: '1,975.6', s: '4,698', h: false, bar: 14 },
  { p: '1,975.4', s: '3,022', h: false, bar: 9 },
  { p: '1,975.2', s: '2,146', h: false, bar: 6 },
  { p: '1,975.0', s: '18,232', h: true, bar: 55 },
  { p: '1,974.8', s: '3,209', h: false, bar: 10 },
  { p: '1,974.6', s: '7,523', h: true, bar: 22 },
  { p: '1,974.4', s: '4,000', h: false, bar: 12 },
  { p: '1,974.2', s: '4,732', h: false, bar: 14 },
  { p: '1,974.0', s: '5,806', h: false, bar: 17 },
  { p: '1,973.8', s: '4,753', h: false, bar: 14 },
  { p: '1,973.6', s: '3,916', h: false, bar: 11 },
  { p: '1,973.4', s: '3,840', h: false, bar: 11 },
  { p: '1,973.2', s: '1,766', h: false, bar: 5 },
  { p: '1,973.0', s: '1,370', h: false, bar: 4 },
  { p: '1,972.8', s: '450', h: false, bar: 100, isAsk: true },
  { p: '1,972.6', s: '1,152', h: false, bar: 100, isBid: true },
  { p: '1,972.4', s: '2,066', h: false, bar: 6 },
  { p: '1,972.2', s: '3,913', h: false, bar: 11 },
  { p: '1,972.0', s: '2,071', h: false, bar: 6 },
  { p: '1,971.8', s: '2,458', h: false, bar: 7 },
  { p: '1,971.6', s: '3,128', h: false, bar: 9 },
  { p: '1,971.4', s: '3,926', h: false, bar: 11 },
  { p: '1,971.2', s: '3,402', h: false, bar: 10 },
  { p: '1,971.0', s: '3,063', h: false, bar: 9 },
  { p: '1,970.8', s: '2,678', h: false, bar: 8 },
  { p: '1,970.6', s: '3,221', h: false, bar: 9 },
  { p: '1,970.4', s: '2,355', h: false, bar: 7 },
  { p: '1,970.2', s: '3,002', h: false, bar: 9 },
  { p: '1,970.0', s: '5,181', h: false, bar: 15 },
  { p: '1,969.8', s: '1,981', h: false, bar: 6 },
  { p: '1,969.6', s: '1,840', h: false, bar: 5 },
  { p: '1,969.4', s: '2,781', h: false, bar: 8 },
  { p: '1,969.2', s: '2,018', h: false, bar: 6 },
  { p: '1,969.0', s: '4,132', h: false, bar: 12 },
  { p: '1,968.8', s: '1,755', h: false, bar: 5 },
  { p: '1,968.6', s: '1,384', h: false, bar: 4 },
  { p: '1,968.4', s: '-', h: false, bar: 0 },
  { p: '1,968.2', s: '-', h: false, bar: 0 },
  { p: '1,968.0', s: '-', h: false, bar: 0 },
  { p: '1,967.8', s: '-', h: false, bar: 0 },
  { p: '1,967.6', s: '-', h: false, bar: 0 },
  { p: '1,967.4', s: '-', h: false, bar: 0 },
  { p: '1,967.2', s: '-', h: false, bar: 0 },
  { p: '1,967.0', s: '-', h: false, bar: 0 },
  { p: '1,966.8', s: '-', h: false, bar: 0 },
];

// Add working orders, controls, and bubbles
ethUsdtSwapPrices[18].wo1 = { size: '842', active: true };
ethUsdtSwapPrices[18].wo2 = { size: '385', active: false };
ethUsdtSwapPrices[19].wo1 = { size: '437', active: false };
ethUsdtSwapPrices[19].wo2 = { size: '4,289', active: true };
ethUsdtSwapPrices[20].wo1 = { size: '465', active: false };
ethUsdtSwapPrices[20].wo2 = { size: '1,791', active: false };
ethUsdtSwapPrices[20].bubbles = [{ size: '4', isBuy: false }, { size: '21', isBuy: false }, { size: '2', isBuy: false }, { size: '20', isBuy: false }];
ethUsdtSwapPrices[21].wo1 = { size: '1,071', active: true };
ethUsdtSwapPrices[21].wo2 = { size: '4,591', active: true };
ethUsdtSwapPrices[21].bubbles = [{ size: '17', isBuy: true }];
ethUsdtSwapPrices[22].wo2 = { size: '1,394', active: false };
ethUsdtSwapPrices[23].wo2 = { size: '2,359', active: false };
ethUsdtSwapPrices[24].wo2 = { size: '407', active: false };
ethUsdtSwapPrices[25].wo2 = { size: '231', active: false };

export const ethUsdtPrices: PriceLevel[] = [
  { p: '1,974.80', s: '2.3421', bar: 10 },
  { p: '1,974.75', s: '4.415', bar: 20 },
  { p: '1,974.70', s: '1.679', bar: 8 },
  { p: '1,974.65', s: '2.824', bar: 12 },
  { p: '1,974.60', s: '3.271', bar: 15 },
  { p: '1,974.55', s: '11.0717', bar: 40 },
  { p: '1,974.50', s: '1.9277', bar: 9 },
  { p: '1,974.45', s: '19.5492', bar: 70 },
  { p: '1,974.40', s: '5.9071', bar: 25 },
  { p: '1,974.35', s: '5.1074', bar: 22 },
  { p: '1,974.30', s: '5.0004', bar: 21 },
  { p: '1,974.25', s: '6.7416', bar: 28 },
  { p: '1,974.20', s: '4.8784', bar: 20 },
  { p: '1,974.15', s: '1.2374', bar: 5 },
  { p: '1,974.10', s: '5.7377', bar: 24 },
  { p: '1,974.05', s: '4.7599', bar: 20 },
  { p: '1,974.00', s: '0.3609', bar: 2 },
  { p: '1,973.95', s: '2.1009', bar: 9 },
  { p: '1,973.90', s: '12.7993', bar: 50 },
  { p: '1,973.85', s: '7.4229', bar: 30 },
  { p: '1,973.80', s: '0.0009', bar: 0 },
  { p: '1,973.75', s: '0.0007', bar: 0 },
  { p: '1,973.70', s: '2.5707', bar: 100, isAsk: true },
  { p: '1,973.65', s: '13.2945', bar: 100, isBid: true },
  { p: '1,973.60', s: '0.0107', bar: 0 },
  { p: '1,973.55', s: '0.6194', bar: 3 },
  { p: '1,973.50', s: '0.2533', bar: 1 },
  { p: '1,973.45', s: '1.1607', bar: 5 },
  { p: '1,973.40', s: '2.0735', bar: 9 },
  { p: '1,973.35', s: '0.2247', bar: 1 },
  { p: '1,973.30', s: '0.264', bar: 1 },
  { p: '1,973.25', s: '4.3095', bar: 18 },
  { p: '1,973.20', s: '7.6488', bar: 32 },
  { p: '1,973.15', s: '3.2338', bar: 14 },
  { p: '1,973.10', s: '0.1276', bar: 1 },
  { p: '1,973.05', s: '3.0204', bar: 13 },
  { p: '1,973.00', s: '7.2266', bar: 30 },
  { p: '1,972.95', s: '-', bar: 0 },
  { p: '1,972.90', s: '0.0213', bar: 0 },
  { p: '1,972.85', s: '8.7929', bar: 36 },
  { p: '1,972.80', s: '0.506', bar: 2 },
  { p: '1,972.75', s: '0.0037', bar: 0 },
  { p: '1,972.70', s: '7.1937', bar: 30 },
  { p: '1,972.65', s: '10.4695', bar: 44 },
  { p: '1,972.60', s: '3.2274', bar: 14 },
  { p: '1,972.55', s: '3.0512', bar: 13 },
  { p: '1,972.50', s: '5.4741', bar: 23 },
  { p: '1,972.45', s: '3.1594', bar: 13 },
  { p: '1,972.40', s: '3.7397', bar: 16 },
  { p: '1,972.35', s: '0.6585', bar: 3 },
  { p: '1,972.30', s: '5.4904', bar: 23 },
];

ethUsdtPrices[13].wo1 = { size: '0.2156', active: false };
ethUsdtPrices[14].wo1 = { size: '0.0162', active: false };
ethUsdtPrices[15].wo1 = { size: '0.2537', active: false };
ethUsdtPrices[16].wo1 = { size: '0.0336', active: false };
ethUsdtPrices[17].wo1 = { size: '0.0168', active: false };
ethUsdtPrices[18].wo1 = { size: '0.9542', active: true };
ethUsdtPrices[19].wo1 = { size: '0.0159', active: false };
ethUsdtPrices[20].wo1 = { size: '0.2089', active: false };
ethUsdtPrices[21].wo1 = { size: '0.0005', active: false };
ethUsdtPrices[22].wo1 = { size: '1.0002', active: false };
ethUsdtPrices[23].wo1 = { size: '1.8282', active: true };

ethUsdtPrices[15].wo2 = { size: '0.0993', active: false };
ethUsdtPrices[16].wo2 = { size: '0.2078', active: false };
ethUsdtPrices[17].wo2 = { size: '1.3368', active: false };
ethUsdtPrices[18].wo2 = { size: '1.2358', active: false };
ethUsdtPrices[19].wo2 = { size: '0.6193', active: false };
ethUsdtPrices[20].wo2 = { size: '1.7435', active: false };
ethUsdtPrices[21].wo2 = { size: '0.5867', active: false };
ethUsdtPrices[22].wo2 = { size: '0.1965', active: false };
ethUsdtPrices[23].wo2 = { size: '15.9575', active: true };
ethUsdtPrices[24].wo2 = { size: '0.9776', active: false };
ethUsdtPrices[25].wo2 = { size: '0.2748', active: false };
ethUsdtPrices[26].wo2 = { size: '0.0466', active: false };
ethUsdtPrices[27].wo2 = { size: '0.0075', active: false };
ethUsdtPrices[28].wo2 = { size: '3.5125', active: false };
ethUsdtPrices[29].wo2 = { size: '0.0211', active: false };
ethUsdtPrices[30].wo2 = { size: '2.9293', active: false };
ethUsdtPrices[31].wo2 = { size: '0.2572', active: false };
ethUsdtPrices[32].wo2 = { size: '0.0715', active: false };
ethUsdtPrices[33].wo2 = { size: '0.0165', active: false };
ethUsdtPrices[34].wo2 = { size: '0.2635', active: false };
ethUsdtPrices[35].wo2 = { size: '0.0001', active: false };
ethUsdtPrices[36].wo2 = { size: '1.6021', active: false };
ethUsdtPrices[37].wo2 = { size: '0.5392', active: false };
ethUsdtPrices[38].wo2 = { size: '0.0372', active: false };
ethUsdtPrices[39].wo2 = { size: '8.3983', active: true };

ethUsdtPrices[22].bubbles = [{ size: '0.00', isBuy: false }, { size: '0.01', isBuy: false }, { size: '0.155', isBuy: false }, { size: '12.3134', isBuy: false }];
ethUsdtPrices[23].bubbles = [{ size: '0.00', isBuy: true }];

export const ethUsdtSwapCandles: Candle[] = [
  { time: '12:10', open: 1968, high: 1969, low: 1966, close: 1967, volume: 100, isUp: false },
  { time: '12:20', open: 1967, high: 1968, low: 1965, close: 1965, volume: 120, isUp: false },
  { time: '12:30', open: 1965, high: 1966, low: 1963, close: 1964, volume: 150, isUp: false },
  { time: '12:40', open: 1964, high: 1967, low: 1963, close: 1966, volume: 110, isUp: true },
  { time: '12:50', open: 1966, high: 1968, low: 1965, close: 1967, volume: 90, isUp: true },
  { time: '13:00', open: 1967, high: 1969, low: 1966, close: 1968, volume: 140, isUp: true },
  { time: '13:10', open: 1968, high: 1971, low: 1967, close: 1970, volume: 200, isUp: true },
  { time: '13:20', open: 1970, high: 1971, low: 1968, close: 1969, volume: 180, isUp: false },
  { time: '13:30', open: 1969, high: 1970, low: 1968, close: 1969, volume: 130, isUp: true },
  { time: '13:40', open: 1969, high: 1972, low: 1968, close: 1971, volume: 160, isUp: true },
  { time: '13:50', open: 1971, high: 1973, low: 1970, close: 1972, volume: 190, isUp: true },
];
