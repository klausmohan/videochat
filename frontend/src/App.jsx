import { Navigate, Route, Routes, useLocation } from "react-router";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage.jsx"));
const CallPage = lazy(() => import("./pages/CallPage.jsx"));
const ChatPage = lazy(() => import("./pages/ChatPage.jsx"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage.jsx"));

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  const location = useLocation(); // needed for AnimatePresence

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  // Animation config
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-300"
      data-theme={theme}
    >
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                isAuthenticated && isOnboarded ? (
                  <Layout showSidebar={true}>
                    <motion.div {...pageTransition}>
                      <HomePage />
                    </motion.div>
                  </Layout>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !isAuthenticated ? (
                  <motion.div {...pageTransition}>
                    <SignUpPage />
                  </motion.div>
                ) : (
                  <Navigate to={isOnboarded ? "/" : "/onboarding"} />
                )
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <motion.div {...pageTransition}>
                    <LoginPage />
                  </motion.div>
                ) : (
                  <Navigate to={isOnboarded ? "/" : "/onboarding"} />
                )
              }
            />
            <Route
              path="/notifications"
              element={
                isAuthenticated && isOnboarded ? (
                  <Layout showSidebar={true}>
                    <motion.div {...pageTransition}>
                      <NotificationsPage />
                    </motion.div>
                  </Layout>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )
              }
            />
            <Route
              path="/call/:id"
              element={
                isAuthenticated && isOnboarded ? (
                  <motion.div {...pageTransition}>
                    <CallPage />
                  </motion.div>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )
              }
            />
            <Route
              path="/chat/:id"
              element={
                isAuthenticated && isOnboarded ? (
                  <Layout showSidebar={false}>
                    <motion.div {...pageTransition}>
                      <ChatPage />
                    </motion.div>
                  </Layout>
                ) : (
                  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
                )
              }
            />
            <Route
              path="/onboarding"
              element={
                isAuthenticated ? (
                  !isOnboarded ? (
                    <motion.div {...pageTransition}>
                      <OnboardingPage />
                    </motion.div>
                  ) : (
                    <Navigate to="/" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
