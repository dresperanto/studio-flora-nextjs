import OrderForm from '@/components/OrderForm';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <>
      <OrderForm />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 6000,
          style: {
            background: '#4a5d3a',
            color: '#ffffff',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
          },
          success: {
            style: {
              background: '#059669',
            },
          },
          error: {
            style: {
              background: '#dc2626',
            },
          },
        }}
      />
    </>
  );
}