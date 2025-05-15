import Navbar from './components/core/Navbar';
import Footer from './components/core/Footer';

function App() {

  return (  
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Your page content goes here */}
      </main>
      <Footer />
    </div>
  )
}

export default App
