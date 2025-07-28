import React, { useState } from 'react';
import { Box } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import CalendarPage from './pages/CalendarPage';
import Finance from './pages/Finance';
import Fitness from './pages/Fitness';
import Journal from './pages/Journal';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Settings from './pages/Settings';
import To_do from './pages/To_do';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContext';


export default function App() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected Routes */}
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <Box sx={{ display: 'flex', height: '100vh' }}>
                                    <Sidebar collapsed={collapsed} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
                                        <Routes>
                                            {/* Main Dashboard */}
                                            <Route path="/overview" element={<Dashboard />} />
                                            <Route path="/contacts" element={<Contacts />} />
                                            <Route path="/calendar" element={<CalendarPage />} />
                                            <Route path="/projects" element={<Projects />} />
                                            <Route path="/settings" element={<Settings />} />
                                            <Route path="/fitness" element={<Fitness />} />
                                            <Route path="/finance" element={<Finance />} />
                                            <Route path="/to_do" element={<To_do />} />
                                            <Route path="/skills" element={<Skills />} />
                                            <Route path="/journal" element={<Journal />} />
                                            {/* Catch-all fallback */}
                                            <Route path="*" element={<Navigate to="/" />} />
                                        </Routes>
                                    </Box>
                                </Box>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
