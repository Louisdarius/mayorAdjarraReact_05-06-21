import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  updateUserProfile,
  viewUserProfile,
} from '../../services/usersServives';
import SidebarProfile from './SideBarProfile';

export default function UserProfile(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tel, setTel] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [telError, setTelError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    getUserProfile();
  }, []);

  async function getUserProfile() {
    viewUserProfile()
      .then((response) => {
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setTel(response.data.user.tel);
        setEmail(response.data.user.email);
        setGender(response.data.user.gender);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleSubmit(event) {
    //event.preventDefault();
    let reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (
      firstName === '' ||
      lastName === '' ||
      tel === '' ||
      email === '' ||
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
      if (email === '') {
        setEmailError('email require');
      } else if (reg.test(email) === false) {
        setEmailError('email is incorrect');
      } else {
        setEmailError(null);
      }
    } else {
      setFirstNameError(null);
      setLastNameError(null);
      setTelError(null);
      setEmailError(null);
      editData();
    }
  }

  async function editData() {
    updateUserProfile(firstName, lastName, tel, email, gender)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.error) {
          setEmailError(error.response.data.error);
        }
      });
  }

  return (
    <div className="content-wrapper">
      <div>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                <h1>Edit User profile</h1>
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
                    <div className="row">
                      <SidebarProfile />
                      <div className="col-md-8 col-12">
                        <div className="col-12 user-detail-record">
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
                                  <p className="errorMessage">
                                    {' '}
                                    {firstNameError}
                                  </p>
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
                                  <p className="errorMessage">
                                    {' '}
                                    {lastNameError}
                                  </p>
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
                                  Gender<i className="required-detail">*</i>
                                </label>
                                <select
                                  className="form-control"
                                  name={gender}
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                >
                                  <option value="Male">Male</option>
                                  <option value="Femalle">Femalle</option>
                                </select>
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
                                Update Record
                              </Link>
                            </h3>
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
