import React, { useState, useEffect, useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import IdleTimer from 'react-idle-timer';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { logout } from '../services/usersServives';
import https from '../utils/https';
import './Navbar.css';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [tokenValue, setTokenValue] = useState(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    tokenFunction();
  }, []);

  const idleTimerRef = useRef(null);
  const onIdle = () => {
    logout()
      .then((response) => {
        localStorage.clear();
        props.history.push('/');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert('err');
      });
  };

  async function tokenFunction() {
    const token = await https.token;
    setTokenValue(token);
  }

  async function logoutUser() {
    confirmAlert({
      title: 'Logout',
      message: 'Are you sure you want to logout.',
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {
            logout()
              .then((response) => {
                localStorage.clear();
                props.history.push('/');
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          label: 'No',
          //onClick: () => alert('Click No'),
        },
      ],
    });
  }

  return (
    <>
      {tokenValue && (
        <IdleTimer
          ref={idleTimerRef}
          timeout={1000 * 60 * 60 * 24}
          onIdle={onIdle}
        ></IdleTimer>
      )}
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
            LawyereXpert
            <i className="fab fa-typo3" />
          </NavLink>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {tokenValue === null ? (
              <li className="nav-item">
                <NavLink
                  to="/sign-in"
                  activeClassName="navbar-active"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-sign-in-alt login-icon"></i> Login
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-links">
                    <i className="fas fa-tachometer-alt login-icon"></i>{' '}
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="#"
                    className="nav-links"
                    onClick={() => logoutUser()}
                  >
                    <i className="fas fa-sign-in-alt login-icon"></i> logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default withRouter(Navbar);
