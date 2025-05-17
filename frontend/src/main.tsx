import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LoadingSpinner } from './components/LoadingAnimation.tsx';
import { persistor, store } from './redux/store/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const Root = () => (
  <Provider store={store}>
    <PersistGate
      loading={<LoadingSpinner />}
      persistor={persistor}
      onBeforeLift={() => new Promise((resolve) => setTimeout(resolve, 3000))} // 3-second delay
    >
      <App />
    </PersistGate>
  </Provider>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
