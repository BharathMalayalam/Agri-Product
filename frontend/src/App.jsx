import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerHome from './pages/CustomerHome';
import FarmerDashboard from './pages/FarmerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoanGuide from './pages/LoanGuide';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/products" element={user?.role === 'customer' ? <CustomerHome /> : <Login />} />
          <Route path="/cart" element={user?.role === 'customer' ? <Cart /> : <Login />} />
          <Route path="/orders" element={user?.role === 'customer' ? <Orders /> : <Login />} />

          <Route path="/farmer-dashboard" element={user?.role === 'farmer' ? <FarmerDashboard /> : <Login />} />
          <Route path="/loan-guide" element={user?.role === 'farmer' ? <LoanGuide /> : <Login />} />
          <Route path="/admin-dashboard" element={user?.role === 'admin' ? <AdminDashboard /> : <Login />} />

          {/* Admin could be added here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
