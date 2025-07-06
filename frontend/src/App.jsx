import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import StudentDashboard from './pages/StudentDashboard';
import CollegeDashboard from './pages/CollegeDashboard';
import BrokerDashboard from './pages/BrokerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/college-dashboard" 
              element={
                <ProtectedRoute>
                  <CollegeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/broker-dashboard" 
              element={
                <ProtectedRoute>
                  <BrokerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/loading" element={<Loading />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App; 