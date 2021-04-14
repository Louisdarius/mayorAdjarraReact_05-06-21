import React, { useEffect, useState } from 'react';
import https from '../../src/utils/https';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { logout, viewUserProfile, viewImage } from '../services/usersServives';

function Header(props) {
  const [user, setUsers] = useState({});
  const [userLogoDisplay, setUserLogoDisplay] = useState('');

  useEffect(() => {
    async function tokenFunction() {
      const token = await https.token;
      if (token === null) {
        localStorage.clear();
        props.history.push('/');
      } else {
        viewUserProfile()
          .then((response) => {
            setUsers(response.data.user);
            if (
              !response.data.token ||
              response.data.user.role._id === '603d56db678b700b6482baf4'
            ) {
              localStorage.clear();
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
            localStorage.clear();
          });

        viewImage()
          .then((response) => {
            setUserLogoDisplay(response.data.userLogo);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    tokenFunction();
  }, [props.history]);

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
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="fake_url"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <span className="btn">
              {userLogoDisplay ? (
                <img
                  className="imageRound"
                  alt=""
                  src={`data:image/jpg;base64,${new Buffer.from(
                    userLogoDisplay
                  ).toString('base64')}`}
                />
              ) : (
                <i className="fas fa-user login-icon"></i>
              )}

              {user.firstName ? user.firstName + ' ' + user.lastName : null}
            </span>
          </li>
          <li className="nav-item dropdown">
            <button className="btn" onClick={() => logoutUser()}>
              <i className="fas fa-sign-in-alt login-icon"></i> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(Header);
