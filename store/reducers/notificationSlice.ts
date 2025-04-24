import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'price_alert' | 'weather_alert';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: number;
  read: boolean;
}

interface NotificationState {
  items: Notification[];
}

const initialState: NotificationState = {
  items: []
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      state.items.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        read: false,
        ...action.payload
      });
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.items = [];
    }
  }
});

export const { addNotification, markAsRead, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;