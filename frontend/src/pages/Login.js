import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './Login.scss';

import api from '../services/api';

import logo from '../assets/logo.svg';

// TODO: Modularize it!

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [errorCode, setErrorCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrorCode(null);

    try {
      const response = await api.post('/devs', { username });

      const { _id: id } = response.data;

      history.push(`/dev/${id}`);
    } catch (err) {
      setErrorCode(err.response.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading && !errorCode ? (
        <div className="loader-container">
          <span>Carregando</span>
          <div className="loader">
            <div className="duo duo1">
              <div className="dot dot-a" />
              <div className="dot dot-b" />
            </div>
            <div className="duo duo2">
              <div className="dot dot-a" />
              <div className="dot dot-b" />
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="tindev logo" />
          <input
            type="text"
            placeholder="Digite seu usuário no Github"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          {errorCode && (
            <div className="error-alert">
              <FaTimes onClick={() => setErrorCode(null)} />
              {errorCode === 400
                ? 'Usuário não possui nome no Github.'
                : 'Usuário informado não existe no Github.'}
            </div>
          )}

          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default Login;
