import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Sheet from './pages/Sheet';
import Compiler from './pages/Compiler';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-darkBg text-white overflow-hidden">
        <Sidebar setIsAuthenticated={setIsAuthenticated} />
        <div className="flex flex-col flex-1 w-full relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-spideyRed/5 to-spideyBlue/5 pointer-events-none"></div>
          <Navbar setIsAuthenticated={setIsAuthenticated} />
          <div className="flex-1 overflow-y-auto p-6 z-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/course" element={<Course />} />
              <Route path="/sheet" element={<Sheet />} />
              <Route path="/compiler" element={<Compiler />} />
              <Route path="/profile" element={<Profile setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
