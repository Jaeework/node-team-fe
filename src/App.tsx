import { Provider } from "react-redux";
import AppRouter from "./router/AppRouter";
import { store } from "./features/store";
import RefreshHandler from "./router/RefreshHandler";

function App() {
  return (
    <Provider store={store}>
      <RefreshHandler />
      <AppRouter />
    </Provider>
  );
}

export default App;
