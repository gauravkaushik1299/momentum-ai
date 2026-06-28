import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import DashboardPage from '../pages/Dashboard/DashboardPage';
import GoalsPage from '../pages/Goals/GoalsPage';
import LoginPage from '../pages/Login/LoginPage';
import TasksPage from '../pages/Tasks/TasksPage';
import CalendarPage from '../pages/Calendar';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* Tasks */}
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <TasksPage />
                        </ProtectedRoute>
                    }
                />

                {/* Goals */}
                <Route
                    path="/goals"
                    element={
                        <ProtectedRoute>
                            <GoalsPage />
                        </ProtectedRoute>
                    }
                />

                {/* Calendar */}
                <Route
                    path="/calendar"
                    element={
                        <ProtectedRoute>
                            <CalendarPage />
                        </ProtectedRoute>
                    }
                />

                {/* Default */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

                {/* Catch all */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;