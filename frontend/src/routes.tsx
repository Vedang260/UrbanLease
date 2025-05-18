// src/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Home  from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PropertyRequest from './components/admin/PropertyRequest';
import PropertyDetails from './components/admin/PropertyDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/admin/properties/pending" element={<PropertyRequest />} />
      <Route path="/admin/property/:propertyId" element={<PropertyDetails />} />
    </Routes>
  );
};

export default AppRoutes;
