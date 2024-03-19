import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { theme } from './utils/theme';
import { Routes } from './routes/router';

function App() {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes />
                    </Suspense>
                </ChakraProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
