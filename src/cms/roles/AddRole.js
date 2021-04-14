import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addRoles } from '../../services/rolesServives';
import ViewRole from './Role';

function Role() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  async function handleSubmit() {
    if (name === '') {
      if (name === '') {
        setNameError('name require');
      } else {
        setNameError(null);
      }
    } else {
      setNameError(null);
      addData();
    }
  }

  async function addData() {
    addRoles(name)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="content-wrapper">
      <div>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6"></div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="card">
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="form-row">
                      <div className="col-12 form-group">
                        <label>
                          Add Role<i className="required-detail">*</i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={name}
                          placeholder="Role name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {nameError ? (
                          <p className="errorMessage"> {nameError}</p>
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
              <ViewRole />
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

export default Role;
