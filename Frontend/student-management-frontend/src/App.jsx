/*import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import CreateStudent from './pages/CreateStudent';
import ProtectedRoute from './components/ProtectedRoute';
import EditStudent from './pages/EditStudent'; 
import Register from './pages/Register';
import ViewStudent from './pages/ViewStudent';


function App() {
  return (
    <Router>
      <Routes>*/
        {/* ✅ Public Routes */}
        /*<Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />*/

        {/* ✅ Protected Routes */}
        /*<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateStudent /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
        <Route path="/view/:id" element={<ProtectedRoute><ViewStudent /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;*/

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import CreateStudent from './pages/CreateStudent';
import ProtectedRoute from './components/ProtectedRoute';
import EditStudent from './pages/EditStudent';
import Register from './pages/Register';
import ViewStudent from './pages/ViewStudent';
import ErrorPage from './pages/ErrorPage'; // Optional: if you have an error page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateStudent /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
        <Route path="/view/:id" element={<ProtectedRoute><ViewStudent /></ProtectedRoute>} />

        {/* ❗ Optional: Catch-all route */}
        <Route path="*" element={<Navigate to="ErrorPage" />} />
      </Routes>
    </Router>
  );
}

export default App;

