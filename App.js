import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import Navigator from './navigations/Navigator';
import { ToastProvider } from 'react-native-toast-notifications'


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ToastProvider>
      <Navigator/>
      </ToastProvider>
      </PersistGate>
    </Provider>
  );
}


