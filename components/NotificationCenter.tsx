import { toast, Toaster } from 'react-hot-toast';

export const NotificationCenter = () => {
  const { notifications } = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    notifications.forEach((notification) => {
      toast[notification.type === 'price_alert' ? 'success' : 'error'](
        notification.message,
        { icon: notification.type === 'price_alert' ? '💰' : '🌦️' }
      );
    });
  }, [notifications]);

  return <Toaster position="bottom-right" />;
};