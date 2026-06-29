import AppRoutes from './routes/AppRoutes';

import AIFloatingButton from './components/ai/AIFloatingButton';
import AIPanel from './components/ai/AIPanel';

function App() {
  return (
    <>
      <AppRoutes />

      <AIFloatingButton />

      <AIPanel />
    </>
  );
}

export default App;