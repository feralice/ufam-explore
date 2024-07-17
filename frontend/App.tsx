import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Routes } from './src/routes';
import { persistor, store } from './src/store';
import { RootSiblingParent } from 'react-native-root-siblings';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <Routes />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;
