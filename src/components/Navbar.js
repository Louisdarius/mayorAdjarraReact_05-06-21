import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { logout, viewUserProfile } from '../services/usersServives';
import https from '../utils/https';
import './Navbar.css';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [tokenValue, setTokenValue] = useState(null);
  const [user, setUsers] = useState({});
  const [userToken, setUserToken] = useState({});

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    tokenFunction();
  }, []);

  async function tokenFunction() {
    const token = await https.token;
    setTokenValue(token);

    viewUserProfile()
      .then((response) => {
        setUsers(response.data.user.role);
        setUserToken(response.data.token);
        console.log(response.data.user);
        if (!response.data.token) {
          localStorage.clear();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
      });
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
            {(tokenValue !== null) &
            (userToken !== null) &
            (user._id !== '603d56db678b700b6482baf4') ? (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links">
                  <i className="fas fa-tachometer-alt login-icon"></i> Dashboard
                </Link>
              </li>
            ) : null}
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
              <li className="nav-item">
                <Link to="#" className="nav-links" onClick={() => logoutUser()}>
                  <i className="fas fa-sign-in-alt login-icon"></i> logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default withRouter(Navbar);
