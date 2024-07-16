import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./src/routes";
import { persistor, store } from "./src/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
