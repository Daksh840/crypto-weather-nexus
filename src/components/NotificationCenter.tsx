// components/NotificationCenter.tsx
// components/NotificationCenter.tsx
'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import type { RootState } from '../../store/reducers/store';

export const NotificationCenter = () => {
  const notifications = useSelector((state: RootState) => state.notifications.items);

  useEffect(() => {
    notifications.forEach((notification) => {
      toast[notification.type === 'price_alert' ? 'success' : 'error'](
        notification.message,
        { 
          icon: notification.type === 'price_alert' ? '💰' : '🌦️',
          duration: 5000,
          id: notification.id // Prevent duplicate toasts
        }
      );
    });
  }, [notifications]);

  return <Toaster position="bottom-right" />;
};