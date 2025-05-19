// src/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Home  from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PropertyRequest from './components/admin/PropertyRequest';
import PropertyDetails from './components/admin/PropertyDetails';
import MyProperty from './components/owner/MyProperty';
import AddPropertyForm from './components/owner/AddPropertyForm';
import UpcomingPayments from './components/tenant/UpcomingPayments';
import PaymentHistory from './components/tenant/PaymentHistory';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/admin/properties/pending" element={<PropertyRequest />} />
      <Route path="/admin/property/:propertyId" element={<PropertyDetails />} />
      <Route path="/owner/properties/my-properties" element={<MyProperty />} />
      <Route path="/owner/properties/new" element={<AddPropertyForm />} />
      <Route path="/tenants/payments/upcoming" element={<UpcomingPayments />} />
      <Route path="/tenants/payments/history" element={<PaymentHistory />} />
    </Routes>
  );
};

export default AppRoutes;
