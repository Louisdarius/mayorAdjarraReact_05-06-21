import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  updateUsers,
  viewEachUser,
  viewUserProfile,
} from '../../services/usersServives';
import { viewRoles } from '../../services/rolesServives';

export default function EditUser(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tel, setTel] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [telError, setTelError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [user, setUsers] = useState({});

  useEffect(() => {
    async function getEach() {
      const id = props.match.params.id;
      viewEachUser(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setTel(response.data.tel);
          setEmail(response.data.email);
          setGender(response.data.gender);
          setStatus(response.data.status);
          setRole(response.data.role);
        })
        .catch((error) => {});
    }
    getEach();
    getRoles();
    getUserProfile();
  }, [props.match.params.id]);

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
        setEmailError('Email is incorrect');
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
    const id = props.match.params.id;
    updateUsers(firstName, lastName, tel, email, gender, status, role, id)
      .then((response) => {
        props.history.push('/users');
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.error) {
          setEmailError(error.response.data.error);
        }
      });
  }

  async function getRoles() {
    viewRoles()
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getUserProfile() {
    viewUserProfile()
      .then((response) => {
        setUsers(response.data.user.role._id);
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        window.location.reload();
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
                <h1>Edit user</h1>
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
                      {user == '6027daf9b6edc45418dff4db' && (
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
                      )}

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
                      <div className="col-md-6 col-12 form-group">
                        <label>
                          Status<i className="required-detail">*</i>
                        </label>
                        <select
                          className="form-control"
                          name={status}
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="actif">Actif</option>
                          <option value="inactif">Inactif</option>
                        </select>
                      </div>
                      {user == '6027daf9b6edc45418dff4db' && (
                        <div className="col-md-6 col-12 form-group">
                          <label>
                            Role<i className="required-detail">*</i>
                          </label>
                          <select
                            className="form-control"
                            name={role}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value={role._id}>{role.name}</option>
                            {roles.map((detail) => (
                              <option key={detail._id} value={detail._id}>
                                {detail.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-header">
                    <div className="row">
                      <div className="col-6">
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
