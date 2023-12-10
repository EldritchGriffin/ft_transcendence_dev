"use client";

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const Client = new QueryClient();

export default function QueryProvider({ children }: { children: React.ReactNode }) {

  return (
        <QueryClientProvider client={Client}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
  );
}