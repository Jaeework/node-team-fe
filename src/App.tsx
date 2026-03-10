import AppRouter from "./router/AppRouter";
import RefreshHandler from "./router/RefreshHandler";

function App() {
  return (
    <>
      <RefreshHandler />
      <AppRouter />
    </>
  );
}

export default App;
