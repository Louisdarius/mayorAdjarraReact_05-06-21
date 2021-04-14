import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addUser } from '../../services/usersServives';

export default function AddUser(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tel, setTel] = useState('');
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [telError, setTelError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  async function handleSubmit() {
    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (
      firstName === '' ||
      lastName === '' ||
      tel === '' ||
      gender === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      password !== confirmPassword ||
      password.length < 8 ||
      reg.test(email) === false
    ) {
      if (firstName === '') {
        setFirstNameError('firstname require');
      } else {
        setFirstNameError(null);
      }
      if (lastName === '') {
        setLastNameError('lastname require');
      } else {
        setLastNameError(null);
      }
      if (tel === '') {
        setTelError('telephone require');
      } else {
        setTelError(null);
      }
      if (gender === '') {
        setGenderError('gender require');
      } else {
        setGenderError(null);
      }
      if (email === '') {
        setEmailError('email require');
      } else if (reg.test(email) === false) {
        setEmailError('Email is incorrect');
      } else {
        setEmailError(null);
      }
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
      setFirstNameError(null);
      setLastNameError(null);
      setTelError(null);
      setGenderError(null);
      setEmailError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);
      addData();
    }
  }

  async function addData() {
    addUser(firstName, lastName, tel, email, password, gender)
      .then((response) => {
        props.history.push('/users');
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.error) {
          setEmailError(error.response.data.error);
        }
        if (error.response.data.errorPassword) {
          setPasswordError(error.response.data.errorPassword);
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
                <h1>Add user</h1>
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
                  <div className="card-header">
                    <h3 className="card-title">
                      <Link to="/users" className="btn btn-info mr-2">
                        View users
                      </Link>
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="form-row">
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          First name<i className="required-detail">*</i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={firstName}
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {firstNameError ? (
                          <p className="errorMessage"> {firstNameError}</p>
                        ) : null}
                      </div>
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Last name<i className="required-detail">*</i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={lastName}
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {lastNameError ? (
                          <p className="errorMessage"> {lastNameError}</p>
                        ) : null}
                      </div>
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Telephone<i className="required-detail">*</i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={tel}
                          placeholder="Telephone"
                          value={tel}
                          onChange={(e) => setTel(e.target.value)}
                        />
                        {telError ? (
                          <p className="errorMessage"> {telError}</p>
                        ) : null}
                      </div>
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Gender<i className="required-detail">*</i>
                        </label>
                        <select
                          className="form-control"
                          name={gender}
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">--Select gender--</option>
                          <option value="Male">Male</option>
                          <option value="Femalle">Femalle</option>
                        </select>
                        {genderError ? (
                          <p className="errorMessage"> {genderError}</p>
                        ) : null}
                      </div>
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Email<i className="required-detail">*</i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={email}
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError ? (
                          <p className="errorMessage"> {emailError}</p>
                        ) : null}
                      </div>
                      <div className="col-md-6 col-12 form-group">
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
                      </div>
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Confirm password<i className="required-detail">*</i>
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          name={confirmPassword}
                          placeholder="Confirm password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError ? (
                          <p className="errorMessage">
                            {' '}
                            {confirmPasswordError}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="card-header">
                    <h3 className="card-title">
                      <Link
                        to="#"
                        onClick={() => handleSubmit()}
                        className="btn btn-info mr-2"
                      >
                        Add New Record
                      </Link>
                    </h3>
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
