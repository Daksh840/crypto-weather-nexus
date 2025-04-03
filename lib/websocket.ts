import { io } from 'socket.io-client';

const cryptoWebSocket = io('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

export const connectToCryptoWS = (dispatch: AppDispatch) => {
  cryptoWebSocket.on('connect', () => {
    console.log('Connected to CoinCap WebSocket');
  });

  cryptoWebSocket.on('priceUpdate', (data) => {
    dispatch(updateCryptoPrice(data));
    if(Math.abs(data.change) > 2) { // 2% threshold
      dispatch(addNotification({
        type: 'price_alert',
        message: `${data.asset} price ${data.change > 0 ? '↑' : '↓'} ${Math.abs(data.change)}%`
      }));
    }
  });
};