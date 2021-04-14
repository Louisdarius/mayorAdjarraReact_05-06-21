import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/usersServives';

function SignIn(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessager] = useState('');

  async function handleSubmit(event) {
    //event.preventDefault();
    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (email === '' || password === '' || reg.test(email) === false) {
      if (!email) {
        setEmailError('Email required');
        setErrorMessager(null);
      } else if (reg.test(email) === false) {
        setEmailError('Email is incorrect');
        setErrorMessager(null);
      } else {
        setEmailError(null);
        setErrorMessager(null);
      }

      if (!password) {
        setPasswordError('Password required');
        setErrorMessager(null);
      } else {
        setPasswordError(null);
        setErrorMessager(null);
      }
    } else {
      setEmailError(null);
      setPasswordError(null);
      setErrorMessager(null);
      submitMessage();
    }
  }
  async function submitMessage() {
    login(email, password)
      .then((user) => {
        console.log(user);
        props.history.push('/');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        //if (error.response) {
        //  setErrorMessager(error.response.data.error);
        // }
      });
  }

  return (
    <>
      <div className="contact">
        <div className="container">
          <div className="row justify-content-center sign-in-box">
            <div className="col-md-7 col-12">
              <div className="php-email-form">
                <div className="form-row">
                  <div className="col-md-12 col-12 form-group">
                    <label>
                      Email<i className="required-detail">*</i>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      name={email}
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    {emailError ? (
                      <p className="errorMessage"> {emailError}</p>
                    ) : null}
                  </div>

                  <div className="col-md-12 col-12 form-group">
                    <label>
                      Password<i className="required-detail">*</i>
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name={password}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError ? (
                      <p className="errorMessage"> {passwordError}</p>
                    ) : null}
                    {errorMessage ? (
                      <p className="errorMessage"> {errorMessage}</p>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 forgot-password">
                    <Link to="/sign-up">Forgot password?</Link>
                  </div>
                  <div className="col-6 btn-text-right">
                    <button onClick={() => handleSubmit()} type="submit">
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
