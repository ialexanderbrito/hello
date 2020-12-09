import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

import { PageHeader } from '../../components/PageHeader';

import './styles.css';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cargo: '',
      Dia: '',
      picture: '',
    };

    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase
      .firestore()
      .collection('funcionario')
      .doc('CkVFG17rlNNWGT7ncZkd')
      .onSnapshot((doc) => {
        document.getElementById('name').innerHTML = doc.data().nome;
        document.getElementById('func').innerHTML = doc.data().cargo;
        document.getElementById('hours').innerHTML = doc.data().Dia;
        document.getElementById('foto1').innerHTML = doc.data().picture;
      });
    firebase
      .firestore()
      .collection('funcionario')
      .doc('gcghVXpY9e1xNxZ1L7JO')
      .onSnapshot((doc) => {
        document.getElementById('name2').innerHTML = doc.data().nome;
        document.getElementById('func2').innerHTML = doc.data().cargo;
        document.getElementById('hours2').innerHTML = doc.data().Dia;
        document.getElementById('foto2').innerHTML = doc.data().picture;
      });
    firebase
      .firestore()
      .collection('funcionario')
      .doc('CwM8fpC2y2mjFdTY4dBO')
      .onSnapshot((doc) => {
        document.getElementById('name3').innerHTML = doc.data().nome;
        document.getElementById('func3').innerHTML = doc.data().cargo;
        document.getElementById('hours3').innerHTML = doc.data().Dia;
        document.getElementById('foto3').innerHTML = doc.data().picture;
      });
  }

  render() {
    return (
      <>
        <div className="container" id="page-list">
          <PageHeader />

          <article className="item">
            <header>
              <img
                src="https://avatars2.githubusercontent.com/u/36086408"
                alt="Perfil"
                id="foto3"
              />
              <div>
                <strong id="name3">Nome</strong>
                <span id="func3">Função</span>
              </div>
            </header>
            <p>Dias trabalhados</p>
            <div className="daylist">
              <div className="dayelements">
                <span>Dia</span>
                <h1>Segunda</h1>

                <span>Horário</span>
                <h1 id="hours0">--:--</h1>
              </div>

              <div className="dayelements">
                <span>Dia</span>
                <h1>Terça</h1>

                <span>Horário</span>
                <h1 id="hours0">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Quarta</h1>

                <span>Horário</span>
                <h1 id="hours0">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Quinta</h1>

                <span>Horário</span>
                <h1 id="hours0">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Sexta</h1>

                <span>Horário</span>
                <h1 id="hours0">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Sábado</h1>

                <span>Horário</span>
                <h1 id="hours0">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Domingo</h1>

                <span>Horário</span>
                <h1 id="hours3">--:--</h1>
              </div>
            </div>
          </article>

          <article className="item">
            <header>
              <img
                src="https://avatars1.githubusercontent.com/u/48072595"
                alt="Perfil"
                id="foto1"
              />
              <div>
                <strong id="name">Nome</strong>
                <span id="func">Função</span>
              </div>
            </header>
            <p>Dias trabalhados</p>
            <div className="daylist">
              <div className="dayelements">
                <span>Dia</span>
                <h1>Segunda</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>

              <div className="dayelements">
                <span>Dia</span>
                <h1>Terça</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Quarta</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Quinta</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Sexta</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Sábado</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Domingo</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
            </div>
          </article>

          <article className="item">
            <header>
              <img
                src="https://avatars2.githubusercontent.com/u/48700181"
                alt="Perfil"
                id="foto2"
              />
              <div>
                <strong id="name2">Nome</strong>
                <span id="func2">Função</span>
              </div>
            </header>
            <p>Dias trabalhados</p>
            <div className="daylist">
              <div className="dayelements">
                <span>Dia</span>
                <h1>Segunda</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>

              <div className="dayelements">
                <span>Dia</span>
                <h1>Terça</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Quarta</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Quinta</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Sexta</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Sábado</h1>

                <span>Horário</span>
                <h1 id="hours2">--:--</h1>
              </div>
              <div className="dayelements">
                <span>Dia</span>
                <h1>Domingo</h1>

                <span>Horário</span>
                <h1 id="hours">--:--</h1>
              </div>
            </div>
          </article>
        </div>
      </>
    );
  }
}
