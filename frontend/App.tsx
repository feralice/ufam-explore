import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./src/routes";
import { persistor, store } from "./src/store";
import SaveToCalendarModal from "./src/components/modals/save-to-calendar-modal";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SaveToCalendarModal visible={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </PersistGate>
    </Provider>
  );
};

export default App;
