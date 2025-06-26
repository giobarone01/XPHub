import { Routing } from "./routes/Routing";
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from './context/FavoritesProvider';
import TherapistProvider from './context/TherapistProvider';
import Toast from './components/Toast';

export default function App() {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <TherapistProvider>
          <Routing />
          <Toast />
        </TherapistProvider>
      </FavoritesProvider>
    </SessionProvider>
  );
}