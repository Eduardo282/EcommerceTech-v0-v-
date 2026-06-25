import { createRoot } from 'react-dom/client';
import { AppRouter } from './routes.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apolloClient';
import { RubroProvider } from './context/RubroContext';
import { ThemeProvider } from './components/ThemeProvider';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <ApolloProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        enableSystem={false}
        storageKey="evohance-theme"
      >
        <RubroProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </RubroProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
