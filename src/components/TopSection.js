import React from 'react';
import '../App.css';
import './HeroSection.css';

function TopSection(props) {
  return (
    <div className="top-container">
      <h1>{props.heading}</h1>
    </div>
  );
}

export default TopSection;
