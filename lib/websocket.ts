// import { io } from 'socket.io-client';
// import { AppDispatch } from '../store/reducers/store';
// import { updateCryptoPrice, addNotification } from '../store/reducers/cryptoSlice';

// import { Socket } from 'socket.io-client';

// let socket: Socket | undefined;

// export const connectToCryptoWS = (dispatch: AppDispatch) => {
//   if (typeof window === 'undefined') return;

//   if (!socket) {
//     socket = io('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,binancecoin');

//     socket.on('connect', () => {
//       console.log('WebSocket connected');
//     });

//     socket.on('priceUpdate', (data: { [key: string]: number }) => {
//       Object.entries(data).forEach(([asset, price]) => {
//         dispatch(updateCryptoPrice({ asset, price }));
        
//         if (Math.random() < 0.1) { // Simulate alerts
//           dispatch(addNotification({
//             type: 'price_alert',
//             message: `${asset.toUpperCase()} price changed to $${price.toFixed(2)}`
//           }));
//         }
//       });
//     });
//   }

//   return () => {
//     socket?.disconnect();
//   };
// };
// lib/websocket.ts
import { io, Socket } from 'socket.io-client';
import { AppDispatch } from '../store/reducers/store';
import { updateCryptoPrice } from '../store/reducers/cryptoSlice';
import { addNotification } from '../store/reducers/notificationSlice';

let socket: Socket | null = null;

export const connectToCryptoWS = (dispatch: AppDispatch) => {
  if (typeof window === 'undefined' || socket?.connected) return;

  if (!socket) {
    socket = io('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,binancecoin', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('priceUpdate', (data: Record<string, number>) => {
      Object.entries(data).forEach(([asset, price]) => {
        // Update crypto prices
        dispatch(updateCryptoPrice({ id: asset, price }));
        
        // Calculate price change (this will be handled in the reducer)
        dispatch(addNotification({
          type: 'price_alert',
          message: `${asset.toUpperCase()} price updated to $${price.toFixed(2)}`
        }));
      });
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  return () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };
};