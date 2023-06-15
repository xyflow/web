import ChakraClientProvider from './ChakraProvider';
import NhostClientProvider from './NhostProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <NhostClientProvider>
      <ChakraClientProvider>{children}</ChakraClientProvider>
    </NhostClientProvider>
  );
}
