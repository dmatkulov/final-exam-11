import ReactDOM from 'react-dom/client';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
