import React, { useEffect, useState, useRef } from 'react';
import https from '../../src/utils/https';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import IdleTimer from 'react-idle-timer';
import { logout, viewUserProfile, viewImage } from '../services/usersServives';
const baseURLImage = process.env.REACT_APP_BASE_URL_IMAGE;

function Header(props) {
  const [user, setUsers] = useState({});
  const [userLogoDisplay, setUserLogoDisplay] = useState('');
  const [tokenValue, setTokenValue] = useState(null);

  useEffect(() => {
    tokenFunction();
  }, [props.history]);

  async function tokenFunction() {
    const token = await https.token;
    setTokenValue(token);
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
          window.location.reload();
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
      {tokenFunction}
      <div>
        {tokenValue && (
          <IdleTimer
            ref={idleTimerRef}
            timeout={1000 * 60 * 60 * 24}
            onIdle={onIdle}
          ></IdleTimer>
        )}
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
                  // <img
                  //   className="imageRound"
                  //   alt=""
                  //   src={`data:image/jpg;base64,${new Buffer.from(
                  //     userLogoDisplay
                  //   ).toString('base64')}`}
                  //   height="150"
                  //   width="150"
                  // />
                  // <img
                  //   className="imageRound"
                  //   src={`${baseURLImage}/images/${userLogoDisplay}`}
                  //   height="150"
                  //   width="150"
                  // />
                  <i className="fas fa-user user-icon"></i>
                ) : (
                  <i className="fas fa-user user-icon"></i>
                )}

                <span className="headerTitleName">
                  {user.firstName ? user.firstName + ' ' + user.lastName : null}
                </span>
              </span>
            </li>
            <li className="nav-item dropdown logoutDropdown">
              <button className="btn" onClick={() => logoutUser()}>
                <i className="fas fa-sign-in-alt login-icon"></i> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default withRouter(Header);
