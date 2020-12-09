import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { withRouter, Link } from 'react-router-dom';
import { authConfig } from '../../auth/config';

import bg from '../../assets/success-background.svg';
import logo from '../../assets/logo.svg';

import './styles.css';

export const Register = withRouter(({ history }) => {
  function handleInfo() {
    toast.success('✔️ Usuário castrado com sucesso!', {
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
    toast.error(
      <div>
        ❌ Erro ao tentar cadastra usuário.
        <br /> Tente novamente!
      </div>,
      {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }

  const cadastrarFunc = useCallback(
    async (event) => {
      event.preventDefault();

      const { email, senha } = event.target.elements;
      try {
        await authConfig
          .auth()
          .createUserWithEmailAndPassword(email.value, senha.value);
        handleInfo();
        history.push('/');
      } catch (error) {
        handleError();
      }
    },
    [history]
  );

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
            <form className="login-form-container" onSubmit={cadastrarFunc}>
              <fieldset>
                <legend>Cadastrar usuário</legend>

                <input
                  type="email"
                  className="floating-input"
                  name="email"
                  placeholder="Digite seu melhor email"
                />
                <input
                  type="password"
                  className="floating-input"
                  name="senha"
                  placeholder="Digite sua melhor senha"
                />

                <button className="login-button" type="submit">
                  Cadastrar
                </button>

                <Link id="linkCadastrar" to="/">
                  <div className="login-footer">Voltar</div>
                </Link>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
