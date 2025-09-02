import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import { PageLoader } from "./components/PageLoader.jsx";
import { useAuthUser } from "./hooks/useAuthUser.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  console.log(authUser)
  const isOnboarded = authUser?.isOnboarded;


  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme="dracula">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <HomePage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/onboarding"
          element={isAuthenticated ? <OnboardingPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
