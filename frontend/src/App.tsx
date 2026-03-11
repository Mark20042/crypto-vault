import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import AuthLayout from './pages/auth/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/users/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes with shared layout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
