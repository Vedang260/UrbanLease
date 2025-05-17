import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/core/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/core/Footer';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from './hooks/hooks';

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isSidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster position="top-right" />
        <div className="flex flex-1">
          {isAuthenticated && (
            <div className="fixed top-[72px] left-0 h-[calc(100vh-72px)] z-40">
              <Sidebar />
            </div>
          )}
          <main
            className={`flex-grow transition-all duration-300 ${
              isAuthenticated
                ? isSidebarCollapsed
                  ? 'ml-[80px]' // Matches w-20
                  : 'ml-[64px] lg:ml-[256px]' // Matches w-64
                : ''
            }`}
          >
            <AppRoutes />
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

