import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link, Redirect } from 'react-router-dom';
import './Main.scss';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

const Main = ({ match }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await api.get('/devs', {
          headers: {
            user: match.params.id
          }
        });

        setUsers(response.data);
      } catch (err) {
        setError(true);
      }
    };

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id }
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  const handleLike = async id => {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    });
    setUsers(users.filter(user => user._id !== id));
  };

  const handleDislike = async id => {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    });
    setUsers(users.filter(user => user._id !== id));
  };

  if (error) return <Redirect to="/" />;

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="tindev logo" />
      </Link>
      {users.length ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Sem usuários para mostrar :(</div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match" />
          <img className="avatar" src={matchDev.avatar} alt="user's avatar" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(null)}>
            FECHAR
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
