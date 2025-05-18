// src/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Home  from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PropertyListing from './pages/PropertyListing';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/properties" element={<PropertyListing />} />
    </Routes>
  );
};

export default AppRoutes;
