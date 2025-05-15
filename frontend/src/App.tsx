import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/core/Navbar';
import Footer from './components/core/Footer';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

