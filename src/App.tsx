import './App.css';
import { Toaster } from './components/ui/toaster';
import AddressLookup from './features/AddressLookup';

function App() {
  return (
    <>
      <AddressLookup />
      <Toaster />
    </>
  );
}

export default App;
