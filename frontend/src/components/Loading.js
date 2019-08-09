import React from 'react';
import './Loading.scss';

const Loading = () => (
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
);

export default Loading;
