import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { theme } from './utils/theme';
import { Routes } from './routes/router';
import Loader from './pages/components/Loader';

function App() {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <Suspense fallback={<Loader />}>
                        <Routes />
                    </Suspense>
                </ChakraProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
