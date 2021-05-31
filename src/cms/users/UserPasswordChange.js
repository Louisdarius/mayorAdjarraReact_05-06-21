import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { changePasswordByUser } from '../../services/usersServives';

export default function ChangePassword(props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  async function handleSubmit() {
    if (
      password === '' ||
      confirmPassword === '' ||
      password !== confirmPassword ||
      password.length < 8
    ) {
      if (password === '') {
        setPasswordError('password require');
      } else if (password.length < 8) {
        setPasswordError('minimum 8 characters');
      } else {
        setPasswordError(null);
      }
      if (confirmPassword === '') {
        setConfirmPasswordError('confirm password require');
      } else if (password !== confirmPassword) {
        setConfirmPasswordError('Password confirmation is incorrect');
      } else {
        setConfirmPasswordError(null);
      }
    } else {
      setPasswordError(null);
      setConfirmPasswordError(null);
      changePasswordUser();
    }
  }

  async function changePasswordUser() {
    const id = props.match.params.id;
    changePasswordByUser(password, id)
      .then((response) => {
        props.history.push('/users');
      })
      .catch((error) => {
        if (error.response.data.error) {
          setPasswordError(error.response.data.error);
        }
      });
  }

  return (
    <div className="content-wrapper">
      <div>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Change password</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="form-row">
                      <div className="col-md-8 col-12">
                        <div className="col-md-8 col-12 form-row">
                          <div className="col-12 form-group form-group">
                            <label>
                              New password<i className="required-detail">*</i>
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              name={password}
                              placeholder="New password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError ? (
                              <p className="errorMessage"> {passwordError}</p>
                            ) : null}
                          </div>
                          <div className="col-12 form-group">
                            <label>
                              Confirm password
                              <i className="required-detail">*</i>
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              name={confirmPassword}
                              placeholder="Confirm password"
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                            {confirmPasswordError ? (
                              <p className="errorMessage">
                                {' '}
                                {confirmPasswordError}
                              </p>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row">
                            <div className="col-6">
                              <h3 className="card-title">
                                <Link
                                  to="#"
                                  onClick={() => handleSubmit()}
                                  className="btn btn-info mr-2"
                                >
                                  Change password
                                </Link>
                              </h3>
                            </div>
                            <div className="col-6 goBack">
                              <h3 className="card-title">
                                <Link
                                  to="#"
                                  onClick={() => props.history.goBack()}
                                  className="btn btn-info mr-2"
                                >
                                  Back
                                </Link>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* /.card-body */}
                </div>
                {/* /.card */}
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
}
