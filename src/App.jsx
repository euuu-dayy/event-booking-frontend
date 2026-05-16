import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";

import LoginPage from "./pages/auth/LoginPage";

import RegisterPage from "./pages/auth/RegisterPage";

import DashboardPage from "./pages/dashboard/DashboardPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import EventDetailsPage from "./pages/event/EventDetailsPage";

import MyBookingsPage from "./pages/booking/MyBookingsPage";

import AboutPage from "./pages/about/AboutPage";

import AdminRoute from "./routes/AdminRoute";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

import AdminEventsPage from "./pages/admin/AdminEventsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="/events/:id" element={<EventDetailsPage />} />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookingsPage />
          </ProtectedRoute>
        }
      />

      <Route path="/about" element={<AboutPage />} />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <AdminRoute>
            <AdminEventsPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default App;
