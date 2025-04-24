'use client';

import { Provider } from 'react-redux';
import { store, persistor } from '../store/reducers/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
            <ToastContainer position="bottom-right" />
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}