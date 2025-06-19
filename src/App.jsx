import { Routing } from "./routes/Routing";
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from './context/FavoritesProvider';
import Toast from './components/Toast';

export default function App() {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <Routing />
        <Toast />
      </FavoritesProvider>
    </SessionProvider>
  );
}