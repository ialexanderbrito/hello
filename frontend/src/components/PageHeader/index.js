import React from 'react';
import { Link } from 'react-router-dom';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

import { authConfig } from '../../auth/config';

import logoImage from '../../assets/logo.svg';
import backIcon from '../../assets/back.svg';
import offIcon from '../../assets/off.svg';

import './styles.css';

export const PageHeader = () => (
  <header className="page-header">
    <div className="top-bar-container">
      <Link to="/" onClick={() => authConfig.auth().signOut()}>
        <img src={backIcon} alt="Voltar" />
      </Link>
      <img src={logoImage} alt="Hello" />
      <Link to="/" onClick={() => authConfig.auth().signOut()}>
        <img src={offIcon} alt="Sair" />
      </Link>
    </div>

    <div className="header-content">
      <strong>Estes são</strong>
      <strong>seus funcionários.</strong>
    </div>
  </header>
);
