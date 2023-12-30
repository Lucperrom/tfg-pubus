import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, matchRoutes, useLocation, useNavigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import SignUpForm from "./auth/SignUpForm";
import LoginPage from "./auth/LoginPage";
import SignUpPage from "./auth/SignUpPage";
import './static/css/home.css';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      {error.message ? (<pre>{error.message}</pre>) : undefined}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const user = useSelector(state => state.tokenStore.user);
  const location = useLocation();
  const navigate = useNavigate();
  
  /**
   * Se utilizan diferentes rutas dependiendo del estado de inicio de sesión del usuario
   */

  /**
   * Rutas que estarán disponibles para administradores
   */
  function adminRoutes() {
    if (user?.is_admin) {
      return (
        <>
          <Route exact path="/" element={<Navigate to="/players" />} />
          <Route exact path="/players/new" element={<SignUpForm className="page-container" 
            onSignUp={() => navigate('/')} />} />
        </>
      )
    }
  }

  /**
   * Rutas que estarán disponibles para usuarios no autenticados
   */
  function notLoggedRoutes() {
    if (!user) {
      return (
        <>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
        </>
      );
    }
  }

  /**
   * Rutas que estarán disponibles para usuarios autenticados que no son administradores
   */
  function notAdminRoutes() {
    if (user && !user?.is_admin) {
      return (
        <>
        </>
      )
    }
  }

  function getRoutes() {
    return (
      <>
        {notLoggedRoutes()}
        {adminRoutes()}
        {notAdminRoutes()}
      </>
    )
  }

  const recursivePathFinding = (children) => {
    return children.map((child) => {
      if (!child?.props?.path && Array.isArray(child?.props?.children)) {
        return recursivePathFinding(child.props.children);
      }

      return child?.props?.path;
    })
  };

  function getAvailablePaths() {
    return React.Children
    .map(getRoutes(), (rootElement) => {
      return recursivePathFinding(rootElement.props.children);
    })
    .filter((i) => Boolean(i));
  }

  function getCurrentRoute() {
    const routeObjects = getAvailablePaths().map((p) => {
      return {
        path: p
      }
    });

    const matchedRoutes = matchRoutes(routeObjects, location);

    if (matchedRoutes) {
      const [{ route }] = matchedRoutes;

      return route.path;
    }    
  }

  const isAuthorizedPath = getAvailablePaths().some((p) => {
    return p === getCurrentRoute();
  });

  useEffect(() => {
    if (!isAuthorizedPath && location.pathname !== "/") {
      console.warn('Redirigiendo a / por falta de permisos');
      navigate("/");
    }
  }, [isAuthorizedPath, location]);

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback} >
        {user ? <AppNavbar /> : undefined}
        <Routes>
          {getRoutes()}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
