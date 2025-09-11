import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import InternshipDetails from './pages/internship-details';
import ProfileSetup from './pages/profile-setup';
import UserRegistration from './pages/user-registration';
import ApplicationTracking from './pages/application-tracking';
import RecommendationDashboard from './pages/recommendation-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ApplicationTracking />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/internship-details" element={<InternshipDetails />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/application-tracking" element={<ApplicationTracking />} />
        <Route path="/recommendation-dashboard" element={<RecommendationDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
