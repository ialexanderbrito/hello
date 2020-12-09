/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { authConfig } from '../../auth/config';
import { AuthContext } from '../../auth/AuthContext';

import bg from '../../assets/success-background.svg';
import logo from '../../assets/logo.svg';

import './styles.css';

export const Login = withRouter(({ history }) => {
  function handleInfo() {
    toast.success('✔️ Usuário conectado!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function handleError() {
    toast.error('❌ Usuário e/ou senha incorreto.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const longinFunc = useCallback(
    async (event) => {
      event.preventDefault();

      const { email, senha } = event.target.elements;

      try {
        await authConfig
          .auth()
          .signInWithEmailAndPassword(email.value, senha.value);
        handleInfo();
        history.push('/list');
      } catch (error) {
        handleError();
      }
    },
    [history]
  );

  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div id="container">
      <div id="page-login">
        <div id="page-login-content" className="container">
          <div className="logo-container">
            <img src={bg} alt="Background" className="background-shapes" />
            <div className="logo-wrapper">
              <img src={logo} alt="Background" className="logo-image" />
              <h2>Seu sistema de controle de ponto.</h2>
            </div>
          </div>

          <div className="login-container">
            <form className="login-form-container" onSubmit={longinFunc}>
              <fieldset>
                <legend>Fazer login</legend>

                <input
                  type="email"
                  className="floating-input"
                  name="email"
                  placeholder="Digite seu email"
                />
                <input
                  type="password"
                  className="floating-input"
                  name="senha"
                  placeholder="Digite sua senha"
                />
                <div className="login-footer">
                  <div className="checkbox-block">
                    <label>
                      <span className="checkbox-label">Lembrar-me</span>
                      <input type="checkbox" id="checkbox-input" />
                      <span className="checkbox-checkmark" />
                    </label>
                  </div>
                </div>

                <button className="login-button" type="submit">
                  Entrar
                </button>

                <Link id="linkCadastrar" to="/register">
                  <div className="login-footer forgot-password">
                    Cadastrar usuário
                  </div>
                </Link>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
