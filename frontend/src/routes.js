import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext';
import { PrivateRoute } from './auth/PrivateRoute';

import Inicio from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

export default function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/list" component={Inicio} />
        <Route exact path="/register" component={Register} />
      </BrowserRouter>
    </AuthProvider>
  );
}
