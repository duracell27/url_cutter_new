import React from 'react';
import 'materialize-css'
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';

function App() {
  const { token, userId, login, logout } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{ userId, token, login, logout, isAuthenticated }}>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className='container'>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
