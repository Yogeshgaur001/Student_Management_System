import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateStudent /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
        <Route path="/view/:id" element={<ProtectedRoute><ViewStudent /></ProtectedRoute>} />


      </Routes>
    </Router>
  );
}

export default App;
